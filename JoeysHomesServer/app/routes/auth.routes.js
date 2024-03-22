const { authJwt, verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  //app.use(function(req, res, next) {
  //  res.header(
  //    "Access-Control-Allow-Headers",
  //    "x-access-token, Origin, Content-Type, Accept"
  //  );
  //  next();
  //});

  app.use(function (req, res, next) {
    // TODO might have to restrict this
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, x-access-token');
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/submitpasswordreset", controller.submitPasswordReset);

  app.post("/api/auth/refreshtoken", controller.refreshToken);
  
  app.get(
    "/api/auth/authstatus",
    [authJwt.verifyToken],
    controller.authStatus
  );

  app.post(
    "/api/auth/changepassword",
    controller.changePassword
  )
};
