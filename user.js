function User(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
}

// route handler for the form USER / USERINFO
app.post("/createUser", (req, res) => {
    const { name, age, email } = req.body;
    const user = new User(name, age, email);
    const { name: userName, age: userAge, email: userEmail } = user;
    res.render("userInfo", { userName, userAge, userEmail });
  });