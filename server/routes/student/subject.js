const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');

router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'student';
    next();


});


router.get('/', (req, res) => {

    res.render('student/subject/index');

});

router.get('/add', (req, res) => {

    res.render('student/subject/add');

});

router.post('/add', (req, res) => {

    // Add or Remove subjects

    res.render('student/subject/add');

});


module.exports = router;