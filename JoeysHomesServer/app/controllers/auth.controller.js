//import { MailtrapClient } from "mailtrap"
const mailtrap = require("mailtrap")
require('dotenv').config()

const db = require("../models");
const config = require("../config/auth.config");
const { user: User, role: Role, refreshToken: RefreshToken } = db;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {

        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully with roles!" });
          });
        });

      } 
      else {

        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully with default roles!" });
        });

      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      let refreshToken = await RefreshToken.createToken(user);

      let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
          refreshToken: refreshToken,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.submitPasswordReset = (req, res) => {

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // Sign token with user's current password, that way password reset is only valid once
      const accessToken = jwt.sign({ id: user.id }, user.password, {
        expiresIn: config.jwtTempExpiration
      });

      // Send email with token embedded in link
      const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN || ''
      const SENDER_EMAIL = process.env.SENDER_EMAIL || ''
      const BASE_URL = "http://192.168.64.3:5173"

      const client = new mailtrap.MailtrapClient({ token: MAILTRAP_TOKEN });

      const sender = { name: "JoeysHomes", email: SENDER_EMAIL };

      console.log(sender)
      console.log(MAILTRAP_TOKEN)
      console.log(SENDER_EMAIL)

      client
        .send({
          from: sender,
          to: [{ email: req.body.email }],
          subject: "Password Reset Request",
          text: `Hello, click this link to reset your password: ${BASE_URL}/passwordreset?username=${user.username}&accessToken=${accessToken}`
        })
        .then(async (response) => {
          console.log(`sent password request ${response}`);
          res.status(200).send({
            message: "Submitted password reset request"
          })
        })
        .catch(err => {
          res.status(500).send({
            message: `Problem sending password reset request. See error: ${err.message}`
          })
        });
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

    console.log(refreshToken)

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });
      
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

exports.authStatus = (req, res) => {
  res.status(200).send("Authenticated.");
};

exports.changePassword = (req, res) => {
  const accessToken = req.body.accessToken

  if (!accessToken) {
    return res.status(403).send({ message: "No token provided!" });
  }

  // Get current user details to verify token with password
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(async (user) => {

    console.log("current password (changePassword):" + user.password)
    // Verify access token
    jwt.verify(accessToken, user.password, (err) => {
      if (err) {
        res.status(401).send({ message: "Invalid token, password reset request likely expired. Try generating a new password reset request." });
      }
      else {
        // Change password where given user
        User.update({ password: bcrypt.hashSync(req.body.password, 8) }, {
          where: {
            username: req.body.username
          }
        })
        .then(async (user) => {
          res.status(200).send({
            message: "Successfully changed password!"
          });
        })
        .catch(err => {
          console.log(err)
          res.status(500).send({ message: err.message });
        });
      }
    });

  });
}