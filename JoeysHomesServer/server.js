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

app.get("/api/houses", (req, res) => {
  
  api.getHouses()
    .then(response => {
      // TODO Test
      console.log(response);
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })

  // TODO Check if I need this
  //return schema.houses.all()
})

app.get("/api/houses/:id", (req, res) => {
  
  api.getHouses(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })

  // TODO Check if I need this
  //return schema.houses.find(id)
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})



