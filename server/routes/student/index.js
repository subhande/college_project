const express = require('express');
const router = express.Router();


router.all('/*', (req, res, next)=>{


    req.app.locals.layout = 'student';
    next();


});


router.get('/', (req, res) => {

    res.render('student/index');


});


module.exports = router;