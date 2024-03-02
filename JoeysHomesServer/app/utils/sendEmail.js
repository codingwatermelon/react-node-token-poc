const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  try {

    var mailConfig;
    if (process.env.NODE_ENV === 'production' ){
        // all emails are delivered to destination
        mailConfig = {
            host: 'live.smtp.mailtrap.io',
            port: 587,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        };
    } 

    let transporter = nodemailer.createTransport(mailConfig);
    

    // create reusable transporter object using the default SMTP transport
    //const transporter = nodemailer.createTransport({
    //  host: process.env.EMAIL_HOST,
    //  port: 465,
    //  auth: {
    //    user: process.env.EMAIL_USERNAME,
    //    pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
    //  },
    //});

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    //transporter.sendMail(options(), (error, info) => {
    //  if (error) {
    //    return error;
    //  } else {
    //    return res.status(200).json({
    //      success: true,
    //    });
    //  }
    //});

     
    transporter.sendMail({
        from: "jacksdevapp@gmail.com",
        to: "jtorres7797@gmail.com",
        subject: "Test Message",
        text: "I hope this message gets through!",
        auth: {
          user: "jacksdevapp@gmail.com",
          refreshToken: "?",
          accessToken: "?",
          expires: 1484314697598,
        },
      });


  } catch (error) {
    return error;
  }
};

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = sendEmail;