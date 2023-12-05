const express = require('express')
const app = express()
const port = 5000

const api = require('./api')

app.use(express.json())
app.use(function (req, res, next) {
  // TODO might have to restrict this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With');
  next();
});

app.use(express.urlencoded({ extended: true }));

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
  // TODO I think I am getting the promise here when I should be getting the req.body to parse login info
  console.log("req (/api/login)")
  console.log(req)
  console.log("req.body (/api/login)")
  console.log(req.body)
  
  //const { email, password } = JSON.parse(req.body)
  const creds = req.body

  //const foundUser = schema.users.findBy({ email, password })
  //if (!foundUser) {
  //    return new Response(401, {}, { message: "No user with those credentials found!" })
  //}
  
  api.loginUser(creds)
    .then(response => {
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



