// Minimum requirements

// Requiring NPM Packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// Creating connection
var connection = mysql.createConnection({
    hose: "localhost",
    port: 3306,
    user: "root",
    password: "#Coolrunnings1993",
    database: "bamazonDB"
});

// Connecting to the mysql and sql database
connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
});

// 1. Display all 10 products for sale (ids, names, and prices)
function displayProducts () {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "choice",
                type: "rawlist",
                choices: function() {
                    var choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                         choiceArray.push(
                            results[i].id + " | " +
                            results[i].product_name + " | $" +
                            results[i].price
                            ) ;
                    }
                    return choiceArray;
                },
                message: "Which item would you like to purchase?"
            },
            {
                name: "qty",
                type: "input",
                message: "What is the quantity you would like to purchase?"
            }
        ])
        .then(function(answer) {
            var answerId = parseInt(answer.choice.charAt(0));
            // console.log("Answer.choice: " + answer.choice);
            // console.log("Qty: " + answer.qty);
            
            connection.query("SELECT * FROM products WHERE id = 'answerId'")

            // NEED TO CHECK INVENTORY LEVEL AND APPROVE OR DENY PURCHASE

        })
    })  
};

// function start() {

// }


// 2. Promt user 2 messages
    // 1. What is the id of the item you would like to purchase?
    // 2. How many units of the item would you like to purchase?


// 3. Attempt to place order and check if the store has enough stock to process request
    // If yes, process order (update database, show customer total cost aka receipt)
    // If no, cancel transaction and display "Insufficient stock"


// ====================================================================================

// Manager View (Next Level)



// ====================================================================================

// Supervisor View (Final Level)