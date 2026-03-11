console.log("Bakery Game WepPage");

const express = require("express");
const { name } = require("ejs");
const app = express();
const port = 8080;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const ingredients = [
        { id: 1, name: "Flour" },
        { id: 2, name: "Sugar" },
        { id: 3, name: "Eggs" },
        { id: 4, name: "Butter" },
        { id: 5, name: "Chocolate Chips" },
        { id: 6, name: "Blueberries" },
        { id: 7, name: "Apples" },
        {}
    ];

app.get("/", (req, res) => {
    res.render("index", { name: "Bakery Game" });
});

app.get("/startGame", (req, res) => {
    res.render("startGame");
});

app.get("/exitGame", (req, res) => {
    res.render("exit");
});

app.get("/getIngrediants", (req, res) => {
    const recipe = req.query.recipe || "No recipe selected";
    res.render("getIngrediants", { recipe: recipe, ingredients: ingredients });
});

app.post("/getIngrediants", (req, res) => {
    const recipe = req.query.recipe || "No recipe selected";

    switch (recipe) {
        case 'Chocolate Chip Cookies':
            console.log(`Finished recipe: ${recipe}`);
            res.render("finishedResult", { recipe: recipe, ingredients: ingredients });
            break;
        case 'Blueberry Muffins':
            console.log(`Finished recipe: ${recipe}`);
            res.render("finishedResult", { recipe: recipe, ingredients: ingredients });
            break;
        case 'Apple Pie':
            console.log(`Finished recipe: ${recipe}`);
            res.render("finishedResult", { recipe: recipe, ingredients: ingredients });
            break;
        case 'Bread rolls':
            console.log(`Finished recipe: ${recipe}`);
            res.render("finishedResult", { recipe: recipe, ingredients: ingredients });
            break;
        default:
            console.log(`Unknown finished recipe: ${recipe}`);
    }
    res.render("getIngrediants", { ingredients: ingredients });
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
            break;
        case 'Blueberry Muffins':
            res.render("bakingProcess", { recipe: recipeName, bakingGif: '/images/muffins.gif' });
            bakingProcess(recipeName, '/images/muffins.gif');
            break;
        case 'Apple Pie':
            res.render("bakingProcess", { recipe: recipeName, bakingGif: '/images/applePie.gif' });
            bakingProcess(recipeName, '/images/applePie.gif');
            break;
        case 'Bread rolls':
            res.render("bakingProcess", { recipe: recipeName, bakingGif: '/images/breadRollsBaking.gif' });
            bakingProcess(recipeName, '/images/breadRollsBaking.gif');
            break;
        default:
            res.render("bakingProcess", { recipe: "Unknown recipe" });
    }
}); 

app.get("/finishedResult", (req, res) => {
    const recipe = req.query.recipe || "No recipe selected";
    res.render("finishedResult", { recipe: recipe });
    switch (recipe) {
        case 'Chocolate Chip Cookies':
            console.log(`Finished recipe: ${recipe}`);
            res.render("finishedResult", { recipe: recipe, finishedCooking: '/images/bakedCookies.jpg' });
            break;
        case 'Blueberry Muffins':
            console.log(`Finished recipe: ${recipe}`);
            res.render("finishedResult", { recipe: recipe, finishedCooking: '/images/bakedMuffins.jpg' });
            break;
        case 'Apple Pie':
            console.log(`Finished recipe: ${recipe}`);
            res.render("finishedResult", { recipe: recipe, finishedCooking: '/images/bakedApplePie.jpg' });
            break;
        case 'Bread rolls':
            console.log(`Finished recipe: ${recipe}`);
            res.render("finishedResult", { recipe: recipe, finishedCooking: '/images/bakedBreadRolls.jpg' });
            break;
        default:
            console.log(`Unknown finished recipe: ${recipe}`);
    }
});

app.listen(port, () => {
    console.log(`Express is now listening on port ${port}`);
    console.log(`http://localhost:${port}`);
});