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
    const query =  "UPDATE products SET stock_quantity = stock_quantity - " + units + " WHERE item_id = " + id + "; SELECT * from products;"
    console.log(query);
    dataBase(query, units, id);
  });
 
function dataBase(query, units, id) {
  connection.connect();  
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
      for(let item of results[1]) {
        if(item.item_id == id) {
          console.log(`Your order cost $${parseFloat(item.cost) * units}`); 
        }
      };
    });
  connection.end();  
}