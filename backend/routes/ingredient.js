const Ingredient = require("../models/Ingredient");
const User = require("../models/User");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")


router.get("/getIngredient", async (req, res) => {
    try {
        const ingredientName = req.body.name; 
        const ingredient = await Ingredient.findOne({ name: ingredientName });
        if (!ingredient) return res.json({ msg: "Ingredient not found" });
        res.json({ msg: "Ingredient found", data: ingredient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});


router.get("/ingredients", async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.json({ msg: "Ingredients found", data: ingredients });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.use((req, res, next) => {
    if (!req.user.admin)
    return res.json({ msg: "Restricted - You are not admin" })
    else next()
})


router.post("/addIngredient", async (req, res) => {
    try {
        await Ingredient.create(req.body);
        res.json({ msg: "Ingredient added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
})



router.post("/deleteIngredient", async (req, res) => {
    try {
        const ingredientName = req.body.name;
        const foundIngredient = await Ingredient.findOne({ name: ingredientName });
        if (!foundIngredient) return res.json({ msg: "Ingredient not found" });
        await foundIngredient.deleteOne();
        res.json({ msg: "Ingredient deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});


module.exports = router

