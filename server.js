// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Creates instance of express
const app = express();

// Parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));

// Setting view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log('views', path.join(__dirname, 'views'));


// *------- Default and Calculate Paths -------*

// Create a route for the home page
// The GET route for the form
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

// *------- User Paths -------*

// Have user default to null - wait for user input to assign
let user = null;

function User(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
}

app.get("/user", (req, res) => {
    res.render('userInfo', {user});
});

// route handler for the form USERINFO
app.post("/user/createUser", (req, res) => {
    const { name, age, email } = req.body;
    user = new User(name, age, email);
    res.redirect("/user");
  });

// *------- Simulate Async Path -------*

app.get("/simulateAsync", (req, res) => {
    setTimeout(() => {
        res.json({ message: "Asynchronous operation completed!" });
    }, 2000);
});

// *------- Fruit Paths -------*

const fruits = ["Apple", "Orange", "Banana"];

app.get("/fruits", (req, res) => {
    res.render("fruits", { fruits });
});
app.post("/fruits/addFruit", (req, res) => {
    const { fruit } = req.body;
    fruits.push(fruit);
    res.redirect("/fruits");
});

// *------- Book Paths -------*

const books = [];

app.get("/books", (req, res) => {
    res.render('books', { books });
});

app.post('/books/addBook', (req, res) => {
    const { title, author, publicationYear } = req.body;
    books.push({ title, author, publicationYear });
    res.redirect("/books");
});

// Initialize array to store results
// HTTPREQUEST route handler
const axios = require("axios");

app.get("/requests", (req, res) => {
    res.render('httpRequest');
});

app.post("/requests/makeRequest", async (req, res) => {
    const { url } = req.body;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.json({ error: error.message });
    }
});

//Start the server on port 4000
var port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});