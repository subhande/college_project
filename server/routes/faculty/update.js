const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');


const {User} = require('../../models/user');
const {Student} = require('../../models/student');
const {Faculty} = require('../../models/faculty');

router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'faculty';
    next();


});

router.get('/', (req, res) => {
    res.render('faculty/update/index');
});

router.post('/info', async (req, res) => {
    const faculty = new Faculty({
       facultyID: req.body.facultyID,
       user: req.user._id
    });
    await faculty.save();
    res.redirect('/faculty');
});



module.exports = router;