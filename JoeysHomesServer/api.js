const Pool = require('pg').Pool

require('dotenv').config()

const pool = new Pool({
  user: process.env.USERNAME || '',
  host: process.env.HOST || '',
  database: process.env.DATABASE || '',
  password: process.env.PASSWORD || '',
  port: process.env.PORT || '',
});

console.log(process.env.USERNAME)
console.log(process.env.HOST)
console.log(process.env.DATABASE)
console.log(process.env.PASSWORD)
console.log(process.env.PORT)

const getHouses = (houseId) => {
  return new Promise(function(resolve, reject) {
    
    if (houseId) {
      const id = parseInt(houseId)

      pool.query('SELECT FROM properties WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        console.log(`houseId ${id}`)
        resolve(`${results.rows}`)
      })
    }
    else {
      pool.query('SELECT FROM properties', (error, results) => {
        if (error) {
          reject(error)
        }
        console.log(`all houses`)
        resolve(`${results.rows}`)
      })
    }
  })
}


//const getMerchants = () => {
//  return new Promise(function(resolve, reject) {
//    pool.query('SELECT * FROM merchants ORDER BY id ASC', (error, results) => {
//      if (error) {
//        reject(error)
//      }
//      resolve(results.rows);
//    })
//  })
//}
//const createMerchant = (body) => {
//  return new Promise(function(resolve, reject) {
//    const { name, email } = body
//    pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
//      if (error) {
//        reject(error)
//      }
//      resolve(`A new merchant has been added added: ${results.rows[0]}`)
//    })
//  })
//}
//const deleteMerchant = (merchantId) => {
//  return new Promise(function(resolve, reject) {
//    const id = parseInt(merchantId)
//    
//    pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
//      if (error) {
//        reject(error)
//      }
//      resolve(`Merchant deleted with ID: ${id}`)
//    })
//  })
//}


//export async function getHouses(id) {
//  //const url = id ? `/api/houses/${id}` : "/api/houses"
//  const url = id ? `/houses/${id}` : "/houses"
//  const res = await fetch(url)
//  if (!res.ok) {
//      throw {
//          message: "Failed to fetch houses",
//          statusText: res.statusText,
//          status: res.status
//      }
//  }
//  const data = await res.json()
//  return data.houses
//}


module.exports = {
//  getMerchants,
//  createMerchant,
//  deleteMerchant,
  getHouses
}