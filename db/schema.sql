-- Create database and tables
DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db;
USE staff_db;

CREATE TABLE department (
    department_id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(department_id)
);

CREATE TABLE role (
    role_id INT AUTO_INCREMENT,
    department_id INT,
    title VARCHAR(30),
    salary DECIMAL,
    PRIMARY KEY(role_id),
    FOREIGN KEY(department_id) 
    REFERENCES department(department_id)
    ON DELETE CASCADE
);

CREATE TABLE employee (
    employee_id INT AUTO_INCREMENT,
    role_id INT,
    manager_id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    PRIMARY KEY(employee_id),
    FOREIGN KEY(role_id)
    REFERENCES role(role_id)
    ON DELETE CASCADE
);
