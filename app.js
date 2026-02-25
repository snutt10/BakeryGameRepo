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

app.get("/startGame", (req, res) => {
    res.render("startGame");
});

app.get("/exitGame", (req, res) => {
    res.render("exit");
});

app.get("/bakingProcess", (req, res) => {
    const recipe = req.query.recipe || "No recipe selected";
    const gif = req.query.gif || "/images/mixing.gif";
    res.render("bakingProcess", { recipe: recipe, bakingGif: gif });
});

app.post("/bakingProcess", (req, res) => {
    const recipeName = req.body.recipe;

    switch (recipeName) {
        case 'Chocolate Chip Cookies':
            console.log(`Starting recipe: ${recipeName}`);
            res.render("bakingProcess", { recipe: recipeName, bakingGif: '/images/cookingCookies.gif' });
            bakingProcess(recipeName, '/images/cookingCookies.gif');
            // Logic to start Chocolate Chip Cookies recipe
            break;
        case 'Blueberry Muffins':
            res.render("bakingProcess", { recipe: recipeName, bakingGif: '/images/muffins.gif' });
            bakingProcess(recipeName, '/images/muffins.gif');
            // Logic to start Blueberry Muffins recipe
            break;
        case 'Apple Pie':
            res.render("bakingProcess", { recipe: recipeName, bakingGif: '/images/applePie.gif' });
            bakingProcess(recipeName, '/images/applePie.gif');
            // Logic to start Apple Pie recipe
            break;
        default:
            res.render("bakingProcess", { recipe: "Unknown recipe" });
    }
});

app.get("/finishedResult", (req, res) => {
    const recipe = req.query.recipe || "No recipe selected";
    res.render("finishedResult", { recipe: recipe });
});

app.listen(port, () => {
    console.log(`Express is now listening on port ${port}`);
    console.log(`http://localhost:${port}`);
});