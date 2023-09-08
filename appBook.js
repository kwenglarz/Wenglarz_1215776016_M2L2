const books = [];

app.get("/", (req, res) => {
    res.render('books', { books });
});

app.post('/addBook', (req, res) => {
    const { title, author, publicationYear } = req.body;
    books.push({ title, author, publicationYear });
    res.redirect("/");
});

// res.render('books', {title, author, publicationYear }) <-- res not defined error