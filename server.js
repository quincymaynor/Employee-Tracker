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

//inquirer prompt and switch case for hanlding the response to the prompt
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices:['View all departments', 'Add a department', 'Delete a department', 'View all roles', 'Add a role', 'delete a role', 'View all employees', 'View all employees by manager', 'View all employees by role', 'Add an employee', 'Update the role of an employee', 'Update the manager of an employee', 'Delete an employee']
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
    case 'Update the role of an employee':
      updateEmployeeRole()
      break;
    case 'Update the manager of an employee':
      updateEmployeeManager()
      break;
    case 'Delete a department':
      deleteDept()
      break;
    case 'Delete a role':
      deleteRole()
      break;
    case 'Delete an employee':
      deleteEmployee()
      break;
    case 'View all employees by manager':
      viewByManager()
      break;
    case 'View all employees by role':
      viewByRole()
      break;
  }
})
};

//department data view function
const viewDept = () => {
  db.query("SELECT * FROM department", function(err, result, fields){
    console.table(result);
    promptUser()
  })
}
//role data view function
const viewRole = () => {
  db.query("SELECT * FROM role", function(err, result, fields){
    console.table(result);
    promptUser()
  })
}
//employee data view function
const viewEmployee = () => {
  db.query("SELECT * FROM employee", function(err, result, fields){
    console.table(result);
    promptUser()
  })
}
//department add function
const addDept = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'dept_name',
      message: 'What is the department name?',
    }
  ]).then(res => {
    const newDept = res
    db.query("INSERT INTO department SET ?", newDept, function(err, result, fields){
    promptUser()
  })})
}
//role add function
const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the role title?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the role salary?',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'What department is the role under?',
    }
  ]).then(res => {
    const newRole = res
    db.query("INSERT INTO role SET ?", newRole , function(err, result, fields){
    promptUser()
  })})
}
//employee add function
const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the employee first name?',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the employee last name?',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'What is the employee role id?',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'What is the employee manager id?',
    }
  ]).then(res => {
    const newEmployee = res
    db.query("INSERT INTO employee SET ?", newEmployee, function(err, result, fields){
    promptUser()
  })})
}
//employee update function
const updateEmployeeRole = () => {
  db.query("SELECT * FROM employee", function(err, result, fields){
    console.table(result);
  })

  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeQuery',
      message: 'What is the ID of the employee you would like to update?',
    },
    {
      type: 'input',
      name: 'roleQuery',
      message: 'What is the employees new role id?'
    }
  ]).then(res => {
    const updateRole = res.roleQuery;
    const updateEmployee = res.employeeQuery;
    db.query("UPDATE employee SET role_id = ? WHERE id = ?;", 
    [updateRole, updateEmployee]
    );
    promptUser();
  })
}

// BONUS update employee managers
const updateEmployeeManager = () => {
  db.query("SELECT * FROM employee", function(err, result, fields){
    console.table(result);
  })

  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeQuery',
      message: 'What is the ID of the employee you would like to update?',
    },
    {
      type: 'input',
      name: 'managerQuery',
      message: 'What is the ID of the employees new manager?'
    }
  ]).then(res => {
    const updateManager = res.managerQuery;
    const updateEmployee = res.employeeQuery;
    db.query("UPDATE employee SET manager_id = ? WHERE id = ?;", 
    [updateManager, updateEmployee]
    );
    promptUser();
  })
}
// BONUS view employees by manager
const viewByManager = () => {
  db.query("SELECT * FROM employee ORDER BY manager_id", function(err, result, fields){
    console.table(result);
    promptUser()
  })
}
// BONUS view employees by role
const viewByRole = () => {
  db.query("SELECT * FROM employee ORDER BY role_id", function(err, result, fields){
    console.table(result);
    promptUser()
  })
}
// BONUS department delete function
const deleteDept = () => {
  db.query("SELECT * FROM department", function(err, result, fields){
    console.table(result);
  })

  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'What is the department ID?',
    }
  ]).then(res => {
    console.log(res)
    const deleteDept = res.id
    db.query("DELETE FROM department WHERE id = ?", deleteDept, function(err, result, fields){
    promptUser()
  })})
}
// BONUS role delete function
const deleteRole = () => {
  db.query("SELECT * FROM role", function(err, result, fields){
    console.table(result);
  })

  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'What is the role ID?',
    }
  ]).then(res => {
    console.log(res)
    const deleteRole = res.id
    db.query("DELETE FROM role WHERE id = ?", deleteRole, function(err, result, fields){
    promptUser()
  })})
}
// BONUS employee delete function
const deleteEmployee = () => {
  db.query("SELECT * FROM employee", function(err, result, fields){
    console.table(result);
  })

  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'What is the employee ID?',
    }
  ]).then(res => {
    console.log(res)
    const deleteEmployee = res.id
    db.query("DELETE FROM employee WHERE id = ?", deleteEmployee, function(err, result, fields){
    promptUser()
  })})
}
// BONUS view the total utilized budget of a department—in other words, the combined salaries of all employees in that department (COUNT   GROUP BY)


//start first round of questions
promptUser()