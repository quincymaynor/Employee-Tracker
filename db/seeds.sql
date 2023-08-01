INSERT INTO department (dept_name)
VALUES ("Admin"),
       ("Front End"),
       ("Back End");
       
INSERT INTO role (title, salary, department_id)
VALUES ("Junior Developer", 60000,2),
("Junior Developer", 60000,3),
("Senior Developer", 100000,2),
("Senior Developer", 100000,3),
("Team Lead", 120000,2);

INSERT INTO employee ( first_name , last_name , role_id, manager_id)
VALUES ("John", "Doe", 5, NULL),
("Jack", "Doe", 4, 1),
("Johann", "Doe", 3, 1),
("Johnathan", "Doe", 2, 1),
("Jean", "Doe", 1, 1);
