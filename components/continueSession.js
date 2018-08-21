const inquirer = require('inquirer');
const connection = require('./connection');

const continueSession = function(next) {
  inquirer
  .prompt([
    {
      name: 'yesorno',
      message: "continue session?",
      type: 'list',
      choices: ["Return to Menu", "Logout"]
    }  
  ])
  .then(function(answer) {
    switch (answer.yesorno) {
      case 'Return to Menu':
        next();
        break;
      case 'Logout':
        connection.end();
        break;
    }    
  });
};

module.exports = continueSession;