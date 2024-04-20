const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: [true, 'User email is required!'],
        unique: true,
        minlength: 5,
        maxlength: 255,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    password: {
        type: String, 
        required: [true, 'Password is required!'],
        minlength: 8
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3
    },
    admin: { type: Boolean, default: false },
    recipes: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const User = mongoose.model('Users', userSchema);

module.exports = User;