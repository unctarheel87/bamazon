const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'bootcamp',
  database : 'bamazon',
  multipleStatements: true
});

module.exports = connection;