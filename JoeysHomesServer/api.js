const Pool = require('pg').Pool

require('dotenv').config()

const pool = new Pool({
  user: process.env.USERNAME || '',
  host: process.env.HOST || '',
  database: process.env.APPDATABASE || '',
  password: process.env.PASSWORD || '',
  port: process.env.PORT || '',
});

const getHouses = (houseId) => {
  return new Promise(function(resolve, reject) {
    
    if (houseId) {
      const id = parseInt(houseId)
      console.log(id)

      pool.query('select properties.id as properties_id, * from properties join propertiesbasicgeneraldetails on properties.id = propertiesbasicgeneraldetails.id where properties.id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        console.log(results.rows)
        resolve(results.rows)
      })
    }
    else {
      pool.query('select properties.id as properties_id, property_address, image_path, purchase_price from properties join propertiesbasicgeneraldetails on properties.id = propertiesbasicgeneraldetails.id', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows)
      })
    }
  })
}

const getMaintenance = (maintenanceId) => {
  return new Promise(function(resolve, reject) {
    
    if (maintenanceId) {
      const id = parseInt(maintenanceId)
      console.log(id)

      pool.query('select * from PropertiesMaintenance where id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        console.log(results.rows)
        resolve(results.rows)
      })
    }
    else {
      pool.query('select id, maintenance_name, cost, maintenance_type, EXTRACT(EPOCH from due_date) as due_date_epoch from PropertiesMaintenance order by due_date desc', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows)
      })
    }
  })
}

module.exports = {
  getHouses,
  getMaintenance
}
