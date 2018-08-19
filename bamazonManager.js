const cTable     = require('console.table');
const inquirer   = require('inquirer');
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'bootcamp',
  database : 'bamazon',
  multipleStatements: true
});

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
        case answer.choices[0]:
          
          break;
        case answer.choices[1]:
        
          break;
        case answer.choices[2]:
        
          break;
        case answer.choices[3]:
        
          break;
        default:
          break;
      }
    });
}; 