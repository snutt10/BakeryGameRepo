console.log("Bakery Game WepPage");

const express = require("express");
const { name } = require("ejs");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.listen(port, () => {
    console.log(`Express is now listening on port ${port}`);
    console.log(`http://localhost:${port}`);
});