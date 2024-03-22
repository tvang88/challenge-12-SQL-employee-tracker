// dependancies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const db = require (".");

const connection = mysql.createConnection({
    host:"localhost",

    //port 3001
    port:3001,

    user: "tvang",

    password: "1angeLina33$",
    database: "employee_info_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log ("connected as id" + connection.threadId);

    startScreen();
});

function startScreen (){
    inquirer
    .createPromptModule({
        type: "list",
        choices: [
            "Add department",
            "Add role",
            "View departments",+
            "View roles",
            "View employees",
            "Update employee's role",
            "Quit/Terminated"
        ],
        message: "What would you like to do?", 
        name: "option"
    })
    .then(function(result) {
        console.log ("You entered:" + result.option);

        switch (result.option){
            case "Add department":
                addDepartment();
                break;
                case "Add role":
                    addRole ();
                    break;
            case "Add employee":
                addEmployee();
                break;
            case "View Departments":
                viewDepartment();
                break;
            case "View roles":
                viewRoles();
                break;
            case "View employees":
                viewEmployees();
                break;
            case "Update employee role":
                updateEmployee ();
                break;
            default:
                quit/terminated();
        }
    });
}

//Functions

function addDepartment(){
    inquirer.createPromptModule({

        type: "input",
        message: "Enter department name please.",
        name: "deptName"

    }).then(function(answer){

        connection.query("insert into department (name) VALUES (?)", [answer.deptName], function(err, res){
            if (err) throw err;
            console.table(res)
            startScreen()
        })
    })
}

function addRole() {
    inquirer
    .prompt ([
        {
            type: "input",
            message: "What is the name of employee's role?",
            name: "roleName"
        },
        {
        type: "input",
        message: "what is the salary for the role?",
        name: "salaryTotal"
        },
        {
            type: "input",
            message: "What is the department ID?",
            name: "deptID"
        }
    ])
    .then(function(answer) {

        connection.query ("insert into role (title, salary, department_id) VALUES (?,?,?)", [answer.roleName, answer.salaryTotal, answer.deptID], function (err, res){
            if (err) throw err;
            console.table(res);
            startScreen();
        });
    });
}

    //function to add employee
    function addEmployee(){
        inquirer
        .prompt([
            {
              type: "input",
              message: "What is the employee first name?",
              name: "eeFirstName"  
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "eeLastName"
            },
            {
                type: "input",
                message: "What is the employee's ID number?",
                name: "idNumber"
            },
            {
                type: "input",
                message: "What is the manager id number?",
                name: "managerID"
            }
        ])
        .then(function(answer) {

            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?,?)", [ answer.eeFirstname, answer.eeLastName, answer.rolerID, answer.managerID], function (err, res){
                if (err) throw err;
                console.table(res);
                startScreen ();
            });
        });
    }

    function updateEmployee (){
        inquirer
            .prompt([
                {
                type: "input",
                message: "Which employee would you like to make updates too?",
                name: "updateRole"
                },
            ])
            .then(function(answer){

                connection.query ('UPDATE employee SET role_id=? WHERE first_name =?', [answer.updateRole, answer.eeUpdate], function (err, res){
                    if (err) throw err;
                    console.table (res);
                    startScreen();
                });
            });
    }
    function viewDepartment(){
        let query = "SELECT * FROM department";
        connection.query(query, function (err,res){
            if (err) throw err;
            startScreen();
        });
    }
    function viewRoles (){
        let query = "SELECT * FROM role";
        connection.query(query, function(err, res){
            if (err) throw err;
            console.table(res);
            startScreen();
        });
    }
    function viewEmployees(){
        let query = "SELECT * FROM employees";
        connection.query (query, function(err,res ){
            if (err) throw err;
            console.table(res);
            startScreen ();
        });
    }
    function quit(){
        connection.end();
        process.exit();
    }
