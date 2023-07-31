INSERT INTO department (dept_name)
VALUES (""),
       (""),
       ("");
       
INSERT INTO role (title, salary, department_id)
VALUES ("Senior Developer", 45000,1),
("Junior Developer", 45000,2),
("Newbie", 45000,3),
("Team Lead", 45000,1),
("Department Head", 45000,2);

INSERT INTO employee ( first_name , last_name , role_id, manager_id)
VALUES ("John", "Doe", 5, NULL),
("Jack", "Doe", 4, NULL),
("Johann", "Doe", 3, 2),
("Johnathan", "Doe", 2, 2),
("Jean", "Doe", 1, 2);
