const express = require('express')
const cors = require("cors")

const app = express()
const port = 5000

const corsOptions = {
  origin: "http://192.168.64.3:5000"
};

const api = require('./api');

//app.use(cors(corsOptions));
app.use(express.json())
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

// auth routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app.get("/api/houses", (req, res) => {
  
  api.getHouses()
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.get("/api/houses/:id", (req, res) => {
  
  console.log(req)

  api.getHouses(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.get("/api/maintenance", (req, res) => {
  
  api.getMaintenance()
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.get("/api/maintenance/:id", (req, res) => {
  
  api.getMaintenance(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.post("/api/login", (req, res) => {
  // TODO Use hashed version of password here
  //const { email, password } = JSON.parse(req.body)
  console.log("/api/login body")
  console.log(req.body)
  
  const creds = req.body

  //const foundUser = schema.users.findBy({ email, password })
  //if (!foundUser) {
  //    return new Response(401, {}, { message: "No user with those credentials found!" })
  //}

  api.loginUser(creds)
    .then(response => {
      console.log("response")
      console.log(response)

      res.json(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })

  // At the very least, don't send the password back to the client 😅
  //foundUser.password = undefined
  //return {
  //    user: foundUser,
  //    token: "Enjoy your pizza, here's your tokens."
  //}

})

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