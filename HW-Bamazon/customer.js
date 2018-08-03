let mysql = require('mysql');
const cTable = require('console.table');
let inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root', 
    password: 'mypassword',
    database: 'bamazon'
});

connection.connect(function(err){
    if(err) throw err;
    else{
        //console.log(connection.threadId);
        displayProducts();
    }
});

function promptCustomer(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID of the product you would like?'
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to buy?'
        }
    ]).then(function(answer){

        // TODO: Check if the product ID actually exists
        
        connection.query("SELECT * FROM products WHERE ?", {item_id: answer.id}, function(err, res){
            console.log(`You plan to buy ${answer.quantity} ${res[0].product_name}(s)`);

            if(parseInt(res[0].stock_quantity) - parseInt(answer.quantity) < 0){
                console.log(`Oh no! There are only ${res[0].stock_quantity} left in stock.`);
                inquirer.prompt({
                    type: 'input',
                    message: 'Would you like to revise your order?? y/no',
                    name: 'choice'
                }).then(function(answer){
                    if(answer.choice.toUpperCase() === 'Y' || answer.choice.toUpperCase() === 'YES'){
                        promptCustomer();
                    }
                    else if(answer.choice.toUpperCase() === 'N' || answer.choice.toUpperCase() === 'NO'){
                        console.log("Ok come back again soon!");
                        connection.end();
                    }
                    else{
                        console.log("Not a valid selection. Logging out");
                        connection.end();
                    }
                });
            }
            else{
                let updatedQuantity = parseInt(res[0].stock_quantity) - parseInt(answer.quantity);
                completeTransaction(answer.id, updatedQuantity);
                //console.log(updatedQuantity);
                showTotalPrice(res[0].price, answer.quantity);
                updateRevenue(res[0].price, answer.quantity, res[0].item_id, res[0].product_sales);
            }
        });
    });
}

function updateRevenue(price, quantity, id, currentSale){
    let newSale = parseFloat(price) * parseInt(quantity);
    newSale += parseFloat(currentSale);
    let query = "UPDATE products SET ? WHERE ?";
    let updates = [
        {
            product_sales: newSale
        },
        {
            item_id: id
        }
    ];
    connection.query(query, updates, function(err, res){
        if(err) throw err;
    });
}

function buyMore(){
    inquirer.prompt({
        type: 'input',
        message: 'Buy more? y/no',
        name: 'choice'
    }).then(function(answer){
        if(answer.choice.toUpperCase() === 'Y' || answer.choice.toUpperCase() === 'YES'){
            displayProducts();
        }
        else if(answer.choice.toUpperCase() === 'N' || answer.choice.toUpperCase() === 'NO'){
            console.log("Ok come back again soon!");
            connection.end();
        }
        else{
            console.log("Not a valid selection. Logging out");
            connection.end();
        }
    });
}
function showTotalPrice(price, quantity){
    var total = parseFloat(price) * parseInt(quantity);
    console.log(`Your total for the order is $${total.toFixed(2)}`);
    buyMore();
}
function completeTransaction(id, quantity){
    connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: quantity},{item_id: id}], function(err, res){
        if (err) throw err;
    });
}
function displayProducts(){
    console.log("===== Current Inventory ====");
    var query = "SELECT item_id as ID, product_name as NAME, price as PRICE FROM products";
    connection.query(query, function(err, res){
        console.table(res);
        promptCustomer();
    });
}