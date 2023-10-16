const express = require('express')
const app = express()
const port = 3001

const api = require('./api')

app.use(express.json())
app.use(function (req, res, next) {
  // TODO might have to restrict this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With');
  next();
});

//app.get('/', (req, res) => {
//  merchant_model.getMerchants()
//  .then(response => {
//    res.status(200).send(response);
//  })
//  .catch(error => {
//    res.status(500).send(error);
//  })
//})

app.get("/houses", (req, res) => {
  
  api.getHouses()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })

  // TODO Check if I need this
  //return schema.houses.all()
})

app.get("/houses/:id", (req, res) => {
  
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

//app.post('/merchants', (req, res) => {
//  merchant_model.createMerchant(req.body)
//  .then(response => {
//    res.status(200).send(response);
//  })
//  .catch(error => {
//    res.status(500).send(error);
//  })
//})
//
//app.delete('/merchants/:id', (req, res) => {
//  console.log("this is a test")
//  console.log(req.params.id)
//
//  merchant_model.deleteMerchant(req.params.id)
//  .then(response => {
//    res.status(200).send(response);
//  })
//  .catch(error => {
//    console.log(error)
//    res.status(500).send(error);
//  })
//})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})



