const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
},
description: {
    type: String,
    required: true,
}
});


const ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = ingredient;