const Pool = require('pg').Pool
const fs = require('fs');

var pwd = '';

test = fs.readFile('protected/passwd.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // Note: Can't do this with async function (readFile) because code below this occurs before this function executes, and therefore pwd doesn't get set accordingly
  pwd = data;
  //console.log(pwd);
});

console.log(test);
console.log(await test);
console.log(await test.data);

const pool = new Pool({
  user: 'postgres',
  host: '192.168.64.2',
  database: 'test_merchant_db',
  password: pwd,
  port: 5432,
});

const getMerchants = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM merchants ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}
const createMerchant = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, email } = body
    pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new merchant has been added added: ${results.rows[0]}`)
    })
  })
}
const deleteMerchant = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    console.log(id)
    console.log("test")
    pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
      if (error) {
	console.log(error)
        reject(error)
      }
      resolve(`Merchant deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getMerchants,
  createMerchant,
  deleteMerchant,
}
