const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'F!uff3rNutt3r',
    database: 'admin_db'
  },
  console.log(`Connected to the administrative database.`)
);

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices:['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
  ]).then(res => {
  switch (res.action){
    case 'View all departments':
      viewDept()
      break;
    case 'View all roles':
      viewRole()
      break;
    case 'View all employees':
      viewEmployee()
      break;
    case 'Add a department':
      addDept()
      break;
    case 'Add a role':
      addRole()
      break;
    case 'Add an employee':
      addEmployee()
      break;
    case 'Update an employee role':
      updateEmployeeRole()
      break;
  }
})
};

//begin functions for switchcase
const viewDept = () => {
  db.query("SELECT * FROM department", function(err, result, fields){
    console.table(result);
    promptUser()
  })
}
const viewRole = () => {
  db.query("SELECT * FROM role", function(err, result, fields){
    console.table(result);
    promptUser()
  })
}
const viewEmployee = () => {
  db.query("SELECT * FROM employee", function(err, result, fields){
    console.table(result);
    promptUser()
  })
}

const addDept = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'deptName',
      message: 'What is the department name?',
    }
  ]).then(res => {
    db.query("INSERT INTO department", function(err, result, fields){

    promptUser()
  })})
}
const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: 'What is the role title?',
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'What is the role salary?',
    },
    {
      type: 'input',
      name: 'roleDept',
      message: 'What department is the role under?',
    }
  ]).then(res => {
    db.query("INSERT INTO role", function(err, result, fields){

    promptUser()
  })})
}
const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the employee first name?',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the employee last name?',
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'What is the employee role id?',
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'What is the employee manager id?',
    }
  ]).then(res => {
    db.query("INSERT INTO employee", function(err, result, fields){

    promptUser()
  })})
}

const updateEmployeeRole = () => {
  db.query("SELECT * FROM employee", function(err, result, fields){
    console.table(result);
  })

  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeQuery',
      message: 'Which employee would you like to update?',
    },
    {
      type: 'input',
      name: 'roleQuery',
      message: 'What is the employees new role?'
    }
  ]).then(res => {
    db.query("UPDATE role SET ? WHERE ?;",
    [
      {
        title: res.roleQuery
      },
      {
        id: res.employeeQuery
      }
    ]);
    // promptUser();
  })
}

// const updateEmployeeRole = () => {
//   viewEmployee()
//   .then(([values]) => {
//     let employeeData = values;
//     const employeeChoices = employeeData.map(({id, first_name, last_name}) => ({
//       name:`${first_name} ${last_name}`,
//       value: id
//     }));

//start questions
promptUser()