const inquirer   = require('inquirer');
const bcrypt     = require('bcrypt');
const saltRounds = 10;
const connection = require('./connection');

function createLogin() {
  inquirer
  .prompt([
    {
      name: 'username',
      message: "Create a username"
    },
    {
      type: 'password',
      name: 'password',
      message: "Create a password"
    }
  ])
  .then(function(answers) {
    checkUserName(answers.password, answers.username);
  });
};

function hashPass(textPass, username) {
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

function checkUserName(pass, user) {
  connection.query(`SELECT username FROM users`, function(err, res) {
    if(err) throw err;
    for(let username of res) {
      if(username.username === user) {
        console.log("Username already exists...");
        connection.end();
        return false;
      } 
    }
    setUser(pass, user);
  });
};

function setUser(pass, user) {
  connection.query(`INSERT INTO users SET username = ?`,
    [user],
    function(err, res) {
    if(err) throw err;
    hashPass(pass, user);
  });  
};

createLogin();