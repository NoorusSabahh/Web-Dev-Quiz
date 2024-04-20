var createError = require("http-errors");
var express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

var app = express();
var dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

var url = process.env.URI;

(async () => {
    try {
        await mongoose.connect(url)
        console.log('Connection established successfully!');
    } catch (error) {
        console.error('Unable to connect to the database', error);
    }
}) ()
const router = require('./routes/index');
app.use(cors());
app.use('/', router);

app.use( function (req, res, next) {
    next(createError(404));
});

const port = 3001;
app.listen(port, console.log(`Server running on port ${port}`));