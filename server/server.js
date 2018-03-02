require('./config/config');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const _ = require('lodash');
const bodyParser  = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');


const PORT = process.env.PORT;

let app = express();

// middleware

// Use Static

app.use(express.static(path.join(__dirname, '../public')));

// Set View Engine

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'home'
}));
app.set('view engine', '.hbs');

//Body Parser

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Load Routes
const home = require('./routes/home/index');

// Use Routes

app.use('/',home);



console.log(path.join(__dirname, '../public'));

app.listen(PORT, () => {
    console.log(`Started up at port ${PORT}`);
});


module.exports = {app};

