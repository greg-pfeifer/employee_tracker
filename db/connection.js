// Set up connection to database and exported it
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'staff_db'
});

module.exports = connection

