const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');

router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'student';
    next();


});


router.get('/', (req, res) => {

    //TO DO : Fetch assignments related to specific students

    res.render('student/attendance/index');

});


module.exports = router;