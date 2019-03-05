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
    console.log("Connected as ID: " + connection.threadId);
    start();
});


// Functions
// =============================================================================

// Intial function to start prompt and display inventory
function start() {

    inquirer.prompt([{

        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Would you like to view our inventory?",
        default: true

    }])
    .then(function(user) {
        if (user.confirm === true) {
            displayInventory();
        }
        else {
            console.log("Thank you for your interest! Come back soon!");
        };
    });
};

// Displays Inventory
function displayInventory() {

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("\n" + "Items for sale!");
        console.log("============================================");
        for (let i = 0; i < results.length; i++) {
            console.log(
                "ID: " + results[i].id + " | " +
                results[i].product_name + " | " +
                "Price: $" + results[i].price
            );
        };
        selectItem();
    })
};

// Prompts user to select item, then checks inventory level
function selectItem() {

    inquirer.prompt([
    {
        type: "input",
        name: "inputId",
        message: "Please enter the item ID # you would like to purchase: "
    },
    {
        type: "input",
        name: "inputQty",
        message: "How many units of this item would you like to purchase? "
    }
    // Checks inventory level of item of selction in DB and approves or denies purchase
    ]).then(function(userChoice) {

        // Connects to DB and checks stock level
        connection.query("SELECT * FROM products WHERE id=?", userChoice.inputId, function(err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {

                // Declines transaction if stock level is below qty desired
                if(userChoice.inputQty > res[i].stock_quantity) {

                    console.log("=====================================================================");
                    console.log("We apologize. There is not enough stock on hand to process your order");
                    console.log("                   Please try again later");
                    start();

                }
                // Approves transaction if stock on hand is sufficient for purchase
                else {

                    console.log("=====================================================================");
                    console.log("Hooray! There is enough stock on hand to fulfill your order!");
                    console.log("=====================================================================");
                    console.log("You have selected the following items: ");
                    console.log("---------------------------------------");
                    console.log("Item: " + res[i].product_name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price: $" + res[i].price);
                    console.log("Qty: " + userChoice.inputQty);
                    console.log("---------------------------------------");

                    var newQty = (res[i].stock_quantity - userChoice.inputQty);
                    var purchaseId = (userChoice.inputId);

                    // takes user to confirmPurchase function to handle DB updates and complete trans
                    confirmPurchase(newQty, purchaseId);
                }
            }
        })
    });
};

// Function for confirming purchase
function confirmPurchase(newQty, purchaseId) {

    // Asks user to confirm purchase
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirmPurchase",
            message: "Are you sure you would like to purchase this item at the listed qty?",
            default: true
        }
    ]).then(function(userConfirm) {

        // If they confirm, connect to DB
        if (userConfirm.confirmPurchase === true) {

            // updates qty levels in DB
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newQty
            }, {
               id: purchaseId 
            }], function(err, res) {
            if (err) throw err;

            // Thanks user for transaction
            console.log("================================");
            console.log("Transaction completed. Thank you");
            console.log("================================");
            })
        }
        // Cancels transaction if user denies confirmation
        else {
            console.log("================================");
            console.log("Someone can't make up their mind");
            console.log("           Goodbybe");
            console.log("================================");
            start();
        }
    })
        
};


// Manager View (Next Level)
// ====================================================================================




// Supervisor View (Final Level)
// ====================================================================================
