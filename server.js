const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
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
    db.query("INSERT INTO department SET ?", (res.deptName), function(err, result, fields){
    console.table(result);
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
    db.query("INSERT INTO role VALUES ?", (res.roleTitle, res.roleSalary, res.roleDept), function(err, result, fields){
    console.table(result);
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
      name: 'roleTitle',
      message: 'What is the employee role title?',
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'What is the employee manager id?',
    }
  ]).then(res => {
    db.query("INSERT INTO employee (first_name, last_name, role_title, manager_id) VALUES (res.firstName, res.lastName, res.roleId, res.managerId)", function(err, result, fields){
    console.table(result);
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

// BONUS update employee managers

// BONUS view employees by manager

// BONUS view employees by department

// BONUS delete departments, roles, and employees (DELETE FROM   WHERE)

// BONUS view the total utilized budget of a department—in other words, the combined salaries of all employees in that department (COUNT   GROUP BY)

//start questions
promptUser()