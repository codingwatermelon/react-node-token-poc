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

      // TODO Sign token with current password as salt (dont know if I really care about this since temp token will expire within an hour anyways)
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtTempExpiration
      });

      // TODO Send email with tokens embedded in link e.g.,
      // /passwordreset?accessToken={}

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        // TODO Remove this because it will be sent in email instead later
        // If verificaation of access token doesnt work, I could also verify refreshToken
        accessToken: token
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

  // Verify access token
  jwt.verify(accessToken, config.secret, (err, decoded) => {
    if (err) {
      return "Invalid access token"
    }
    req.userId = decoded.id;
  });

  // Change password where given user
  User.update({ password: bcrypt.hashSync(req.body.password, 8) }, {
    where: {
      username: req.body.username
    }
  })
    .then(async (user) => {
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}











// signin function for password
exports.temp_signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // TODO Compare stored password against hashed password in link given to user from email as described here: https://melodiessim.netlify.app/Reset%20Password%20Flow%20Using%20JWT/
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

      // TODO Create temporary token with much shorter lifespan than usual token
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      
      // TODO Create temporary token with much shorter lifespan than usual signin token
      let refreshToken = await RefreshToken.createToken(user, 3600);

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