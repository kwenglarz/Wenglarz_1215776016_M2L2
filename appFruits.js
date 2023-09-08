const fruits = ["Apple", "Orange", "Banana"];

app.get("/", (req, res) => {
    res.render("fruits", { fruits });
});
app.post("/addFruit", (req, res) => {
    const { fruit } = req.body;
    fruits.push(fruit);
    res.redirect("/");
});