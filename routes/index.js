const inquirer = require('inquirer');

const {  } = require('fs').promises;

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices:['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
]);
};

// const init = () => {
//   promptUser()
//     .then((answers) => )
//     .then(() => )
//     .catch((err) => console.error(err));
// };

init();
