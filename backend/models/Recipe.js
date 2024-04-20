const mongoose = require('mongoose');
const Ingredient = require('./Ingredient');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
    }],
    description: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;