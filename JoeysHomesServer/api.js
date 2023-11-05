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

      pool.query('select properties.id as property_id, property_address, property_description, image_path, base_value, purchase_date from properties join propertiesdetails on properties.id = propertiesdetails.id where properties.id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows)
      })
    }
    else {
      pool.query('select properties.id as property_id, property_address, property_description, image_path, base_value, purchase_date from properties join propertiesdetails on properties.id = propertiesdetails.id', (error, results) => {
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
