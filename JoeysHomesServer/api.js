const Pool = require('pg').Pool

require('dotenv').config()

const pool = new Pool({
  user: process.env.USERNAME || '',
  host: process.env.HOST || '',
  database: process.env.DATABASE || '',
  password: process.env.PASSWORD || '',
  port: process.env.PORT || '',
});

const getHouses = (houseId) => {
  return new Promise(function(resolve, reject) {
    
    if (houseId) {
      const id = parseInt(houseId)

      pool.query('SELECT * FROM properties join propertiesdetails on properties.id = propertiesdetails.id WHERE properties.id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows)
      })
    }
    else {
      pool.query('SELECT * FROM properties join propertiesdetails on properties.id = propertiesdetails.id', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows)
      })
    }
  })
}

module.exports = {
  getHouses
}
