const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');

router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'student';
    next();


});


router.get('/', (req, res) => {

    //TO DO :

    res.render('student/questions/index');

});

router.get('/myquestions', (req, res) => {

    //TO DO :

    res.render('student/questions/myquestions');

});

router.get('/myanswers', (req, res) => {

    //TO DO :

    res.render('student/questions/myanswers');

});


module.exports = router;