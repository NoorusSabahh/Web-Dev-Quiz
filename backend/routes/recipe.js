const User = require('../models/User');
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");


router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json({ recipes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.get('/recipe/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('ingredients');

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json({ recipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});


router.use((req, res, next) => {
    if (req.user && req.user.admin) {
        next();
    } else {
        return res.status(403).json({ msg: "Restricted - You are not admin" });
    }
});



router.post('/addRecipe', async (req, res) => {
    try {
        const { name, description, selectedIngredients } = req.body;
        console.log(req.body)
        // Check if selectedIngredients array is empty
        if (selectedIngredients.length === 0) {
            return res.status(400).json({ error: 'At least one ingredient must be selected' });
        }
        console.log("before creation")
        // Create a new Recipe instance
        const recipe = new Recipe({
            name,
            ingredients: selectedIngredients,
            description
        });
        console.log("recipe create")
        // Save the recipe to the database
        await recipe.save();
        
        // Respond with success message and the saved recipe
        res.status(201).json({ message: 'Recipe created successfully', recipe });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});



module.exports = router
