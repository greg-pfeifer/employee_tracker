const inquirer = require('inquirer')
const db = require('./db/connection')
const table = require('console.table')

//Start inquirer prompts and funnel user responses through conditionals 
function start() {
    inquirer.prompt({
        name: 'options',
        type: 'checkbox', 
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ],
    }).then(answer => {
        if (answer.options == 'View all departments') {
            viewAllDepts()
        }
        if (answer.options == 'View all roles') {
            viewAllRoles()
        }
        if (answer.options == 'View all employees') {
            viewAllEmps()
        }
        if (answer.options == 'Add a department') {
            addDept()
        }
        if (answer.options == 'Add a role') {
            addRole()
        }
        if (answer.options == 'Add an employee') {
            addEmp()
        }
        if (answer.options == 'Update an employee role') {
            updateRole()
        }
        else {
            console.log('')
        }
    }
    )
}
start()

// Functions to view and/or manipulate database
function viewAllDepts() {
    db.query('SELECT * FROM department', (err, result) => {
        if (err)
            throw err
        console.table(result)
        start()
    })
}

function viewAllRoles() {
    db.query('SELECT * FROM role', (err, result) => {
        if (err)
            throw err
        console.table(result)
        start()
    })
}

function viewAllEmps() {
    db.query('SELECT * FROM employee', (err, result) => {
        if (err)
            throw err
        console.table(result)
        start()
    })
}

function addDept() {
    inquirer.prompt({
        name: 'dept_add',
        type: 'input',
        message: 'What is the name of the department you would like to add?'
    }).then(answer => {
        const sql_input = `INSERT INTO department (name) VALUES (?)`;
        const dept_input = [answer.dept_add]
        db.query(sql_input, dept_input, (err, result) => {
            if (err)
                throw err
            console.log('Department has been added, see below.')
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err)
                    throw err
                console.log(result)
            })
            start()
        })
    }
    )}

function addRole() {
    inquirer.prompt([
        {
            name: 'role_add_title',
            type: 'input',
            message: 'What is the name of the role you would like to add?'
        },
        {
            name: 'role_add_salary',
            type: 'input',
            message: 'What is the salary of the role you would like to add?'
        },
        {
            name: 'role_add_dept',
            type: 'input',
            message: 'Please enter the department ID to which this role corresponds.'
        },
    ]).then((answer) => {
        const sql_input = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        const role_input = [answer.role_add_title, answer.role_add_salary, answer.role_add_dept]
        db.query(sql_input, role_input, (err, result) => {
            if (err)
                throw err
            console.log('ROLE HAS BEEN ADDED - SEE BELOW')
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err)
                    throw err
                console.table(result)
            })
        })
    })
}

function addEmp() {
    inquirer.prompt([
        {
            name: 'emp_add_fn',
            type: 'input',
            message: 'What is the first name of the employee?'
        },
        {
            name: 'emp_add_ln',
            type: 'input',
            message: 'What is the last name of the employee?'
        },
        {
            name: 'emp_add_role',
            type: 'input',
            message: 'What is the role ID of the employee?'
        },
        {
            name: 'emp_add_mgr',
            type: 'input',
            message: 'What is the ID of the manager of the employee?'
        },
    ]).then((answer) => {
        const sql_input = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const role_input = [answer.emp_add_fn, answer.emp_add_ln, answer.emp_add_role, answer.emp_add_mgr]
        db.query(sql_input, role_input, (err, result) => {
            if (err)
                throw err
            console.log('EMPLOYEE HAS BEEN ADDED - SEE BELOW')
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err)
                    throw err
                console.table(result)
            })
        })
    })
}

function updateRole() {
    inquirer.prompt([
        {
            name: 'update_name',
            type: 'input',
            message: 'What is the first name of the employee whose role you want to update?'
        },
        {
            name: 'update_role',
            type: 'input',
            message: 'What is the new role ID of the employee?'
        }
    ]).then((answer) => {
        db.query('UPDATE employee SET role_id = ? WHERE first_name = ?', [answer.update_name, answer.update_role], function (err, result) {
            if (err)
            throw err
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err)
                    throw err
                console.table(result)
            }) 
        })        
    })
}
