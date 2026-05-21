# Command-line-interface-CLI-application-for-Retail-Data
This project is a Node.js command-line application that retrieves and analyses retail transaction data from a local server using REST API endpoints.

Features: 
1. View Retail Records
  - Displays the first 5 retail transaction records
  - Sorts data by Customer ID
  - Outputs data in a formatted table
    
2. Average Amount by Product Category
  - Retrieves all product categories
  - Calculates the average transaction amount for each category
- Handles duplicate category spellings (e.g. Books vs books)
  
3. Display Payment Methods
  - Retrieves and displays all available payment methods
  - Sorts payment methods alphabetically
    
4. Query by Payment Method
  - Allows users to select a payment method
  - Displays the top 5 transactions with the highest total amounts for that payment method
  
5. Highest Product Category Amount
  - Determines which product category contains the highest transaction amount

Technologies Used
- Node.js
- JavaScript (ES6 Async/Await)
- REST API
- readline-sync
- node-fetch

Setup
1. Type npm install in terminal
2. Run server (node server.js)
3. Run program 
