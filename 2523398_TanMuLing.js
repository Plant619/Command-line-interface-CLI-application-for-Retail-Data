// Name : Tan Mu Ling
// Class: DIT/1B/07
// Admin No: 2523398

// External libraries used
// readline-sync
// node-fetch   

// Open terminal and type
// npm install readline-sync node-fetch

// Ensure that server is running before running this file

const readline = require("readline-sync");

let retailData;

// Fetch data
function loadRetailData() {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8081/retailData5')
            .then(response => response.json())
            .then(function (data) {
                resolve(data)
            });
    });
}


// User Option
/* Option Menu */
async function userOption() {
    let option = 0;
    let displayOption = `========================= MENU ==============================\n`;
    displayOption += "1. View first 5 records of the Retail Transaction Date.\n";
    displayOption += "2. View the average total amount for each Product Category\n";
    displayOption += "3. View the payment method in the Retail Transaction Data\n";
    displayOption += "4. Query the Retail Transaction Data by payment method.\n";
    displayOption += "5. View the product category with the highest total amount.\n";
    displayOption += "6. Exit\n"
    displayOption += `==============================================================\n`;
    displayOption += `Please select an option (1 - 6) >>> `

    do {
        option = readline.questionInt(displayOption, {limitMessage :"Invalid, please enter an Integer"});
        if (option >= 1 && option <= 6) {
            if (option == 1) {
                try {
                    // Getting the data (endpoint 1)
                    const url = "http://localhost:8081/retailData5";
                    const response = await fetch(url);
                    const data = await response.json();

                    console.log('Customer ID\tPrice\t\tPayment Method\t\tTotal Amount');
                    console.log('----------------------------------------------------------------------------------');

                    // Formatting the data
                    data
                    // Sort by Customer ID 
                    .sort((customer1, customer2) => customer1.customerID - customer2.customerID)
                    // Displaying the first 5 records in table format
                    .forEach(customer => {
                        console.log(`${customer.customerID}\t\t${customer.price}\t${customer.paymentMethod}\t\t\t${customer.totalAmount}`)
                    });
                    console.log('----------------------------------------------------------------------------------');

                } catch (err) {
                    console.log("Error occurred with Option 1. Try again later ", err);
                }
            } else if (option == 2) {
                try {
                    // Get the unique product category (endpoint 4)
                    const url = "http://localhost:8081/productCategory";
                    const response = await fetch(url);
                    const data = await response.json();

                    // Splits the duplicate spellings (Eg. Books vs books)
                    let categories = data.map(arr => arr[1]);       // books
                    let categoriesName = data.map(arr => arr[0]);   // Books

                    // Getting data for each product category (endpoint 3)
                    for (let i = 0; i < categories.length; i++) {
                        let category = categories[i];
                        let categoryName = categoriesName[i];

                        const url = "http://localhost:8081/byProductCategory/" + category;
                        const response = await fetch(url);
                        const data = await response.json();

                        // Calculating average amount
                        const avgAmt = (data.reduce((total, curr) => total + curr.totalAmount, 0) / data.length).toFixed(2);

                        // Printing average amount
                        console.log(`${categoryName} Average Amount: $${avgAmt}`);

                        // delay to prevent overloading the server
                        await new Promise (resolve => setTimeout(resolve, 100));
                    }
                     
                } catch (err) {
                    console.log("Error occurred with Option 2. Try again later ", err)
                }

            } else if (option == 3) {
                try {
                    // Get the payment methods (endpoint 5)
                    const url = "http://localhost:8081/paymentMethod";
                    const response = await fetch(url);
                    const data = await response.json();
                    
                    console.log("Available payment methods: ");

                    // Formatting data
                    let paymentMethods = data.map(paymentArr => paymentArr[0]).sort();
                    // Printing data
                    paymentMethods.forEach(methodName => console.log(`- ${methodName}`));
                    
                } catch (err) {
                    console.log("Error occurred with Option 3. Try again later ", err)
                }
                
            } else if (option == 4) {
                try {
                    // Getting payment methods (endpoint 5)
                    const url = "http://localhost:8081/paymentMethod";
                    const response = await fetch(url); 
                    const data = await response.json();

                    // Formatting data
                    let paymentName = data.map(paymentArr => paymentArr[0]);
                    let paymentMethod = data.map(paymentArr => paymentArr[1]);
                    
                    // Formatting displayed options
                    let displayOption = "Available payment methods: \n"

                    for (let i = 0; i < paymentName.length; i++) {
                        displayOption += `\t${i + 1}. ${paymentName[i]}\n`
                    }

                    displayOption += "Enter payment method (1 to 4): ";

                    // Getting payment option from user
                    let option = 0;
                    while (true) {
                        option = readline.questionInt(displayOption, {limitMessage :"Invalid, please enter an Integer"});
                        if (option >= 1 && option <= 4) {
                            break;
                        } else {
                            console.log("Please select 1 to 4");
                        }
                    } 

                    console.log(`Records for payment method '${option}':`);

                    let paymentMethodName = paymentMethod[Number(option) - 1];

                    // Getting data for the option chosen (endpoint 2)
                    const url2 = "http://localhost:8081/byPaymentMethod/" + paymentMethodName;
                    const response2 = await fetch(url2);
                    const data2 = await response2.json();

                    // Printing in table format
                    console.log('Customer ID\tPrice\t\tPayment Method\t\tTotal Amount');
                    console.log('----------------------------------------------------------------------------------');
                    // Formatting data (sorting by total amount desc, taking first 5)
                    data2
                    .sort((customer1, customer2) => customer2.totalAmount - customer1.totalAmount)
                    .slice(0, 5)
                    .forEach(customer => {
                        console.log(`${customer.customerID}\t\t${customer.price}\t${customer.paymentMethod}\t\t\t${customer.totalAmount}`);
                    });
                    console.log('----------------------------------------------------------------------------------');

                } catch (err) {
                    console.log("Error occurred with Option 4. Try again later ", err);
                }
                
            } else if (option == 5) {
                // Get the unique product category (endpoint 4)
                try {
                    // Get the unique product category (endpoint 4)
                    const url = "http://localhost:8081/productCategory";
                    const response = await fetch(url);
                    const data = await response.json();

                    // Splits the duplicate spellings (Eg. Books vs books)
                    let categories = data.map(arr => arr[1]);       // books
                    let categoriesName = data.map(arr => arr[0]);   // Books

                    let highestCategoryTotalAmt = ["temp", 0];

                    // Getting data for each product category (endpoint 3)
                    for (let i = 0; i < categories.length; i++) {
                        let category = categories[i];
                        let categoryName = categoriesName[i];

                        const url = "http://localhost:8081/byProductCategory/" + category;
                        const response = await fetch(url);
                        const data = await response.json();

                        let total = (data.reduce((highest, curr) => curr.totalAmount > highest ? curr.totalAmount : highest, 0)).toFixed(2);

                        if (highestCategoryTotalAmt[1] < total) {
                            highestCategoryTotalAmt = [categoryName, total];
                        } 
                    }

                    console.log(`${highestCategoryTotalAmt[0]} : $${highestCategoryTotalAmt[1]}`);

                } catch (err) {
                    console.log("Error occurred with Option 5. Try again later ", err)
                }
            }
            pauseForUserInputBeforeContinuing();
        } else {
            console.clear();
            console.log("Please enter a number: 1 - 6");
        }
        
    } while (option != 6);
    console.log("End of Program");
}

function pauseForUserInputBeforeContinuing() {
    readline.question("Enter anything to return to MENU: ");
    console.clear();
}


// Promise all
// show options after data loaded

Promise.all( [loadRetailData()] )
    .then((results) => {
        retailData = results[0];
        console.clear();
        userOption();
    })
    .catch((error) => {
        console.log("Error, Program Exited");
    });
    
