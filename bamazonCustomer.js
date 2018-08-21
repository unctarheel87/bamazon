const cTable     = require('console.table');
const inquirer   = require('inquirer');
const continueSession = require('./components/continueSession');
const connection = require('./components/connection');

connection.query("SELECT item_id, product_name, cost FROM products", function (error, results, fields) {
  if (error) throw error;
  console.log("");
  console.table(results);
  prompt();
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
};  
 
function checkInventory(id, units) {
  const query = `SELECT stock_quantity FROM products 
                 WHERE item_id = ?;`;
  connection.query(query, [id], function (error, res) {
    if (error) throw error;
    if(res[0].stock_quantity < units) {
      console.log(`Insufficient Quantity! There are only ${res[0].stock_quantity} units currently in stock.`)
      continueSession(prompt);
    } else {
      purchaseProduct(id, units);
    }
    });
};

function purchaseProduct(id, units) {
  const query =  `UPDATE products 
                  SET stock_quantity = stock_quantity - ?, 
                  product_sales = product_sales + (cost * ?)
                  WHERE item_id = ?; 
                  SELECT * FROM products 
                  WHERE item_id = ?;`; 
  connection.query(query, [units, units, id, id], function (error, res) {
    if (error) throw error;
    const product = res[1][0];
    console.log(`\nYour purchase of ${product.product_name} comes to $${product.cost * units}.\n`);
    continueSession(prompt);
  }); 
};