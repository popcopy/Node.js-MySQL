const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('cli-table');
const colors = require('colors');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1larchmont!",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id '.magenta + connection.threadId);
    start();
});

function start() {
    console.log("\nWelcome to Bamazon!\n".rainbow);
    //  then prompt users with choices.
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?".america,
        choices: [
            "View Products".green,
            "Buy a Product".green,
            "Exit".red
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View Products".green:
                products();
                break;

            case "Buy a Product".green:
                // start();
                buyItem(); 
                // products();
                
                break;

            case "Exit".red:
                connection.end();
                break;
        }
    })
}
function products() {

    let table = new Table({
        head: ['ID'.yellow, 'Item'.yellow, 'Department'.yellow, 'Price'.yellow, 'Stock'.yellow],
        colWidths:[10, 25, 25, 10, 10]
    });


    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {

            let itemId = res[i].item_id,
                productName = res[i].product_name,
                departmentName = res[i].department_name,
                price = res[i].price,
                stockQuantity = res[i].stock_quantity;

            table.push(
                [itemId, productName, departmentName, price, stockQuantity]
            );
        }
        console.log("\n====================================================== Current Bamazon Inventory ======================================================\n".yellow);
        console.log(colors.green(table.toString()));
        start();
        // buyItem();

    });
}
function buyItem() {
    inquirer.prompt([{

        type: "input",
        name: "inputId",
        message: "What is the ID number of the item you would like to purchase.".underline.yellow,      
    },
    {
        type: "input",
        name: "inputNumber",
        message: "How many units of this item would you like to purchase?".underline.yellow,
    }

    ]).then(function (purchaseInput) {

        // If user quantity input is greater than stock, decline purchase.

        connection.query("SELECT * FROM products WHERE item_id=?", purchaseInput.inputId, function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {

                if (purchaseInput.inputNumber > res[i].stock_quantity) {
                    console.log("\nNot enough in stock. Later.\n");
                    start();

                } else {
                    console.log("===================================");
                    console.log("Here is your order.".green);
                    console.log("===================================");
                    console.log("You've selected:".green);
                    console.log("----------------");
                    console.log("Item: ".green + res[i].product_name);
                    console.log("Department: ".green + res[i].department_name);
                    console.log("Price: ".green + res[i].price);
                    console.log("Quantity: ".green + purchaseInput.inputNumber);
                    console.log("----------------");
                    console.log("Total: ".yellow + res[i].price * purchaseInput.inputNumber);
                    console.log("===================================");

                    // products();
                    // connection();
                    // buyItem();
                    start();
                    
                }
            }
        });
    });
}




