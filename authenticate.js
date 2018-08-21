const inquirer   = require('inquirer');
const mysql      = require('mysql');
const bcrypt     = require('bcrypt');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'bootcamp',
  database : 'bamazon',
  multipleStatements: true
});

const authenticate = function(next) { 
  inquirer
  .prompt([
    {
      name: 'username',
      message: "username?"
    },
    {
      name: 'password',
      message: "password?"
    }
  ])
  .then(function(answers) {
    connection.query(`SELECT password FROM users
                      WHERE username = ?`,
      [answers.username],
      function(err, res) {
      if(err) throw err;
      bcrypt.compare(answers.password, res[0].password, function(err, res) {
        if(err) throw err;
        if(res) {
        console.log("\nYou have successfully logged in. Welcome to the Manager Dashboard.\n")
        next();
        connection.end();
      } else {
        console.log("username or password is incorrect.")
        connection.end();
      }
      }); 
    });
  });  
};

module.exports = authenticate;