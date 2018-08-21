const cTable       = require('console.table');
const inquirer     = require('inquirer');
const authenticate = require('./authenticate');
const continueSession = require('./continueSession');
const connection = require('./connection');

function prompt() {
  inquirer
    .prompt([
      {
        name: 'command',
        type: 'list',
        choices: [
          'View Products for Sale', 
          'View Low Inventory', 
          'Add to Inventory', 
          'Add New Product'
        ],
      }
    ])
    .then(function(answer) {
      switch (answer.command) {
        case 'View Products for Sale':
          viewProducts();
          break;
        case 'View Low Inventory':
          viewLowInventory();
          break;
        case 'Add to Inventory':
          addToInventory();
          break;
        case 'Add New Product':
          addNewProduct();
          break;  
        default:
          break;
      }
    });
};

function viewProducts() {
  connection.query('SELECT * FROM products', function(err, res) {
    if(err) console.log(err);
    console.log("");
    console.table(res);
    continueSession(prompt);
  }); 
};

function viewLowInventory() {
  connection.query('SELECT * FROM products WHERE stock_quantity < 5', 
  function(err, res) {
    if(err) console.log(err);
    console.log("");
    console.table(res);
    continueSession(prompt);
  }); 
};

function addToInventory() {
  inquirer
  .prompt([
    {
      name: 'id',
      message: 'What is the item_id?'
    },
    {
      name: 'units',
      message: 'How many units would you like to add?'
    },
  ])
  .then(function(answers) {
    const query = `UPDATE products 
                   SET stock_quantity = stock_quantity + ?
                   WHERE item_id = ?;`; 
    connection.query(query, [answers.units, answers.id],
      function(err, res) {
        if(err) throw err;
        console.log(`${res.affectedRows} item(s) changed in inventory.`);
        continueSession(prompt);
    });
  });  
};

function addNewProduct() {
  inquirer
  .prompt([
    {
      name: 'product_name',
      message: "What is the product name?"
    },
    {
      name: 'department_name',
      message: "What is the product department?"
    },
    {
      name: 'cost',
      message: "What is the product price?"
    },
    {
      name: 'stock_quantity',
      message: "How many units would you like to add?"
    },
  ])
  .then(function(answers) {
    connection.query(
      "INSERT INTO products SET ?",
        {
          product_name: answers.product_name,
          department_name: answers.department_name,
          cost: answers.cost,
          stock_quantity: answers.stock_quantity
        }, 
        function(err, res) {
          if(err) throw err;
          console.log(`${res.affectedRows} product(s) added successfully.`);
          continueSession(prompt);
      });
  });  
};

authenticate('Manager', prompt);