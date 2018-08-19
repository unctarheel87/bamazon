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
          'View Product Sales by Department',
          'Create New Department'
        ],
      }
    ])
    .then(function(answer) {
      switch (answer.command) {
        case 'View Product Sales by Department':
          viewProductSales();
          break;
        case 'Create New Department':
         
          break;
        default:
          break;
      }
    });
};

function viewProductSales() {
  connection.query(`SELECT department_id, products.department_name, departments.over_head_costs, SUM(product_sales) AS 'product_sales'
                    FROM products
                    RIGHT JOIN departments ON products.department_name = departments.department_name
                    GROUP BY department_id
                    ORDER BY department_id ASC;
                    `,
  function(err, res) {
    if(err) console.log(err);
    console.log("");
    console.table(res);
    connection.end();
  }); 
};

prompt();
