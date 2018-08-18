const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'bootcamp',
  database : 'bamazon',
  multipleStatements: true
});

connection.connect();
connection.query("SELECT * FROM products", function (error, results, fields) {
  if (error) throw error;
  console.log("");
  console.table(results);
  prompt()
}); 


function prompt() {
  inquirer
    .prompt([
      {
        name: 'product_id',
        message: 'What is the id of the product you wish to buy?' 
      },
      {
        name: 'units',
        message: 'How many units would you like to buy?' 
      },
    ])
    .then(function(answers) {
      const id = answers.product_id;
      const units = parseFloat(answers.units);
      checkInventory(id, units);
    });
}  
 
function checkInventory(id, units) {
  const query = `SELECT stock_quantity FROM products 
                 WHERE item_id = ${id};`;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    if(results[0].stock_quantity <= 0) {
      console.log("Insufficient Quantity!")
      connection.end();
    } else {
      updateProducts(id, units);
    }
    });
}

function updateProducts(id, units) {
  const query =  `UPDATE products 
                  SET stock_quantity = stock_quantity - ${units}
                  WHERE item_id = ${id}; 
                  SELECT * FROM products 
                  WHERE item_id = ${id};`  
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    const product = results[1][0];
    console.log(`\nYour purchase of ${product.product_name} comes to $${product.cost * units}.\n`);
    connection.end();
  }); 
}