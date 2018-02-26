require('./config/config');

const express = require('express');
const _ = require('lodash');
const bodyParser  = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');


const PORT = process.env.PORT;

let app = express();

// middleware

app.use(bodyParser.json());

// Load Routes
const home = require('./routes/home/index');

// Use Routes

app.use('/',home);




app.listen(PORT, () => {
    console.log(`Started up at port ${PORT}`);
});


module.exports = {app};

