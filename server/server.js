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

const {selectRole} = require('./helpers/handlebars-helpers');
const {formatDate} = require('./helpers/handlebars-helpers');

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'home',
    helpers: {selectRole: selectRole, formatDate: formatDate}
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

const subjectStudent = require('./routes/student/subject');
const assignmentsStudent = require('./routes/student/assignments');
const questionsStudent = require('./routes/student/questions');
const attendanceStudent = require('./routes/student/attendance');
const updateStudent = require('./routes/student/update');

const faculty = require('./routes/faculty/index');

const subjectsFaculty = require('./routes/faculty/subjects');
const assignmentsFaculty = require('./routes/faculty/assignments');
const questionsFaculty = require('./routes/faculty/questions');
const attendanceFaculty = require('./routes/faculty/attendance');
const updateFaculty = require('./routes/faculty/update');

// Use Routes

app.use('/',home);

app.use('/student',student);

app.use('/student/subject',subjectStudent);
app.use('/student/assignments',assignmentsStudent);
app.use('/student/questions',questionsStudent);
app.use('/student/attendance',attendanceStudent);
app.use('/student/update',updateStudent);

app.use('/faculty',faculty);

app.use('/faculty/subjects',subjectsFaculty);
app.use('/faculty/assignments',assignmentsFaculty);
app.use('/faculty/questions',questionsFaculty);
app.use('/faculty/attendance',attendanceFaculty);
app.use('/faculty/update',updateFaculty);



app.listen(PORT, () => {
    console.log(`Started up at port ${PORT}`);
});


module.exports = {app};

