const inquirer = require('inquirer')
const db = require('./db/connection')
const table = require('console.table')

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