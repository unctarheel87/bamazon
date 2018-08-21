const inquirer   = require('inquirer');
const mysql      = require('mysql');
const bcrypt     = require('bcrypt');
const saltRounds = 10;

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'bootcamp',
  database : 'bamazon',
  multipleStatements: true
});

function createLogin() {
  inquirer
  .prompt([
    {
      name: 'username',
      message: "Create a username"
    },
    {
      name: 'password',
      message: "Create a password"
    }
  ])
  .then(function(answers) {
    connection.query(`INSERT INTO users SET username = ?`,
      [answers.username],
      function(err, res) {
      if(err) throw err;
      hashPass(answers.password, answers.username);
    });
  });
};

const hashPass = function (textPass, username) {
  bcrypt.hash(textPass, saltRounds, function(err, hash) {
    if(err) throw error;
    connection.query(`UPDATE users SET password = ? WHERE username = ?`,
    [hash, username],
    function(err, res) {
      console.log("username and password created successfully!")
      connection.end();
    });
  });
};

createLogin();