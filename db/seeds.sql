INSERT INTO department (name)
VALUES ("Safety"), ("Production"), ("Maintenance"), ("Building and grounds"), ("Supervisor");

INSERT INTO role (title, salary, department_id)
VALUE ("Safety Supervisor", 75500.00, 2), ("Production", 45000.00, 3), ("Maintenance", 90000.00, 4), ("Building and gorunds", 60000.00, 1), ("Management", 80000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("John", "Doe", 1, 3), ("Jane", "Doe", 1, 1), ("Micheal", "Smith", 3, 2), ("Andrew", "Lee", 5, 2), ("Peter", "Shultz", 5, 2);