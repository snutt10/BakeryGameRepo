console.log("Bakery Game WepPage");

const express = require("express");
const { name } = require("ejs");
const app = express();
const port = 8080;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index", { name: "Bakery Game" });
});


app.listen(port, () => {
    console.log(`Express is now listening on port ${port}`);
    console.log(`http://localhost:${port}`);
});