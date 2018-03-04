const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');

router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'student';
    next();


});


router.get('/', (req, res) => {

    res.render('student/index');

});


router.get('/updateinfo', (req, res) => {

    res.render('student/update/updateinfo');

});

router.post('/updateinfo', (req, res) => {

    // TO DO :
    // create documnet in student and redirect to dashboard

    console.log(req.body);
    res.render('student/update/updateinfo');

});





module.exports = router;