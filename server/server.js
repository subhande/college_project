require('./config/config');

const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const _ = require('lodash');
const bodyParser  = require('body-parser');
const session  = require('express-session');
const flash  = require('connect-flash');
const passport  = require('passport');
const methodOverride  = require('method-override');



const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');


const PORT = process.env.PORT;



// middleware

// Use Static

app.use(express.static(path.join(__dirname, '../public')));

// Set View Engine

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'home'
}));
app.set('view engine', '.hbs');


// Session

app.use(session({

    secret: 'subhande123ilovecoding',
    resave: true,
    saveUninitialized: true

}));
app.use(flash());

 //PASSPORT

app.use(passport.initialize());
app.use(passport.session());

 //Body Parser

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Method Override

app.use(methodOverride('_method'));


// Local Variables using Middleware


app.use((req, res, next)=>{

    res.locals.user = req.user || null;

    res.locals.success_message = req.flash('success_message');

    res.locals.error_message = req.flash('error_message');

    res.locals.form_errors = req.flash('form_errors');

    res.locals.error = req.flash('error');

    next();


});


// Load Routes
const home = require('./routes/home/index');
const student = require('./routes/student/index');

// Use Routes

app.use('/',home);
app.use('/student',student);



app.listen(PORT, () => {
    console.log(`Started up at port ${PORT}`);
});


module.exports = {app};

