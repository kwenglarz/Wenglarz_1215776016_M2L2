app.get("/simulateAsync", (req, res) => {
    setTimeout(() => {
        res.json({ message: "Asynchronous operation completed!" });
    }, 2000);
});