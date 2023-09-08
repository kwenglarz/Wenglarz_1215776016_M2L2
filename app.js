const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//Create an instance of express
const app = express();

// We use the 'body-parser' middleware to parse the incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));

//Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log('views', path.join(__dirname, 'views'));


// Create a route for the home page
//The GET route for the form
app.get('/', (req, res) => {
    // Render the form and pass in the current student data
    res.render('index');
});

// Initialize array to store all results
const allResults = [];

// create a route for user to enter the numbers
app.post('/calculate', (req, res) => {
    const { num1, num2 } = req.body;
    const sum = Number(num1) + Number(num2);
    const difference = Number(num1) - Number(num2);
    const product = Number(num1) * Number(num2);
    const quotient = Number(num1) / Number(num2);

    // added code for bonus
    // allResults.push() stores the results in the array
    const firstNum = Number(num1);
    const secondNum = Number(num2);
    allResults.push([firstNum, secondNum]);

    res.render('result', { 
        sum, 
        difference, 
        product, 
        quotient, 
        firstNum, // add value to 'result' input
        secondNum, // add value to 'result' input
        allResults // add value to 'result' input
    });
});

// Start the server on port 4000.
// Note we are advertising the service on port number 4000, not 3000 this time
var port = 4000
// NOTE
// The quotes are replaced by backticks
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});