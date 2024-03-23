const express = require('express')
const rateLimit = require('express-rate-limit');

const { authJwt } = require("./app/middleware");
const controller = require("./app/controllers/user.controller");

const app = express()
const port = 5000

const api = require('./api');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 1000,                  // 1000 requests per IP
})

app.use(express.json(), apiLimiter)
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  // TODO might have to restrict this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With');
  next();
});

// database
const db = require("./app/models");
const Role = db.role;

// TODO uncomment/comment this as needed
db.sequelize.sync();
//initial();

// force: true will drop the table if it already exists
//db.sequelize.sync({force: true}).then(() => {
//  console.log('Drop and Resync Database with { force: true }');
//  initial();
//});

app.get(
  "/api/houses",
  [authJwt.verifyToken],
  controller.houses
)

app.get(
  "/api/houses/:id",
  [authJwt.verifyToken],
  controller.housesWithID
);

app.get(
  "/api/maintenance",
  [authJwt.verifyToken],
  controller.maintenance
);

app.get(
  "/api/maintenance/:id",
  [authJwt.verifyToken],
  controller.maintenanceWithID
);

app.get(
  "/api/houses/:id/maintenance",
  [authJwt.verifyToken],
  controller.maintenanceWithPropertiesID
);

// auth routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

// Create roles initially
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}