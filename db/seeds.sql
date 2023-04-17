INSERT INTO department (name) VALUES
('Sales'),
('Engineering'), 
('Finance'),
('Legal');


INSERT INTO role (department_id, title, salary) VALUES
(1, 'Sales Lead', 100000),
(1, 'Salesperson', 80000),
(2, 'Lead Engineer', 150000),
(2, 'Software Engineer', 120000),
(3, 'Account Manager', 160000),
(3, 'Accountant', 125000),
(4, 'Legal Team Lead', 250000),
(4, 'Lawyer', 190000);


INSERT INTO employee (role_id, manager_id, first_name, last_name) VALUES
(1, null, 'John', 'Doe'),
(2, 1, 'Mike', 'Chan'),
(3, null, 'Ashley', 'Rodriguez'),
(4, 3, 'Kevin', 'Tupik'),
(5, null, 'Kunal', 'Singh'),
(6, 5, 'Malia', 'Brown'),
(7, null, 'Sarah', 'Lourd'),
(8, 7, 'Tom', 'Allen');
