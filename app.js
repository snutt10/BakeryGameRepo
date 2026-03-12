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
        { id: 1, name: "Flour" }, //Chocolate Chip Cookies, Blueberry Muffins, Apple Pie, Bread rolls, Bread Loaf
        { id: 2, name: "Sugar" }, //Blueberry Muffins, Apple Pie, Bread rolls, Bread Loaf
        { id: 3, name: "Eggs" }, //Blueberry Muffins, Apple Pie, Bread rolls, Bread Loaf
        { id: 4, name: "Butter" }, //Chocolate Chip Cookies, Blueberry Muffins, Apple Pie, Bread rolls, Bread Loaf
        { id: 5, name: "Chocolate Chips" }, //Chocolate Chip Cookies
        { id: 6, name: "Blueberries" }, //Blueberry Muffins
        { id: 7, name: "Apples" }, //Apple Pie
        { id: 8, name: "Yeast" }, //Bread rolls, Bread Loaf
        { id: 9, name: "Milk" }, //Blueberry Muffins, Apple Pie, Bread rolls, Bread Loaf
        { id: 10, name: "Salt" }, //Chocolate Chip Cookies, Blueberry Muffins, Apple Pie, Bread rolls, Bread Loaf
        { id: 11, name: "Vanilla Extract" }, //Chocolate Chip Cookies
        { id: 12, name: "Baking soda" }, // Chocolate Chip Cookies
        { id: 13, name: "Baking powder" }, // Blueberry Muffins, Bread rolls, Bread Loaf
        { id: 14, name: "Cinnamon" }, // Blueberry Muffins and Apple Pie
        { id: 15, name: "Nutmeg" }, // Apple Pie
        { id: 16, name: "Vegetable Oil" }, // Blueberry Muffins
        { id: 17, name: "Honey" }, //None, this is a decoy ingredient that is not used in any recipe
        { id: 18, name: "Lemon Juice" }, //None, this is a decoy ingredient that is not used in any recipe
        { id: 19, name: "Cocoa Powder" }, //None, this is a decoy ingredient that is not used in any recipe
        { id: 20, name: "Oats" }, //None, this is a decoy ingredient that is not used in any recipe
        { id: 21, name: "Pie crust"}, //Apple Pie
        { id: 22, name: "Sliced Apples"}, //Apple Pie
        { id: 23, name: "Bread Flour"}, //Bread rolls, Bread Loaf
        { id: 24, name: "Yellow Cornmeal"}, //Bread rolls, Bread Loaf
        { id: 25, name: "Warm Water"}, //Chocolate Chip Cookies, Apple Pie, Bread rolls, Bread Loaf
        { id: 26, name: "Olive Oil"}, //Bread rolls, Bread Loaf
        { id: 27, name: "Garlic Powder"}, //Decoy ingredients
        { id: 28, name: "Dried Oregano"}, //Decoy ingredients
        { id: 29, name: "Dried Basil"}, //Decoy ingredients
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
    let requiredIngredients = ['0'];
    
    switch (recipe) {
        case 'Chocolate Chip Cookies':
            requiredIngredients = ['0', '1', '3', '4', '10', '11', '25'];
            break;
        case 'Blueberry Muffins':
            requiredIngredients = ['0', '1', '2', '3', '9', '8', '10', '5', '12'];
            break;
        case 'Apple Pie':
            requiredIngredients = ['0', '21', '1', '3', '16', '13', '17', '6', '27'];
            break;
        case 'Bread rolls':
            requiredIngredients = ['23', '24', '8', '3', '25', '26', '27', '27', '28'];
            break;
        case 'Bread Loaf':
            requiredIngredients = ['23', '24', '8', '3', '25', '26', '27', '27', '28'];
            break;
    }
    
    res.render("getIngrediants", { 
        recipe: recipe, 
        ingredients: ingredients,
        requiredIngredients: requiredIngredients,
    });
}); 

app.post("/getIngrediants", (req, res) => {
    const recipe = req.query.recipe || "No recipe selected";
    let requiredIngredients = ['0'];
    switch (recipe) {
        case 'Chocolate Chip Cookies':
            requiredIngredients = ['0', '1', '2', '3', '4', '10', '11', '25', '27'];
            console.log(`Finished recipe: ${recipe}`);
            res.render("finishedResult", { recipe: recipe, allIngredients: ingredients, someIngredients: requiredIngredients });
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
        case 'Bread Loaf':
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
        case 'Bread Loaf':
            res.render("bakingProcess", { recipe: recipeName, bakingGif: '/images/breadLoafBaking.gif' });
            bakingProcess(recipeName, '/images/breadLoafBaking.gif');
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
        case 'Bread Loaf':
            console.log(`Finished recipe: ${recipe}`);
            res.render("finishedResult", { recipe: recipe, finishedCooking: '/images/bakedBreadLoaf.jpg' });
            break;
        default:
            console.log(`Unknown finished recipe: ${recipe}`);
    }
});

app.listen(port, () => {
    console.log(`Express is now listening on port ${port}`);
    console.log(`http://localhost:${port}`);
});