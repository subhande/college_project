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


router.get('/', async (req, res) => {
    //console.log(req);
    const faculty = await Faculty.findOne({user: req.user._id});
    if(!faculty) {
        res.render('faculty/update/info');
    } else {
        res.render('faculty/index', {
            name: req.user.firstName+' '+req.user.lastName,
            username: req.user.username,
            email: req.user.email,
            facultyID: faculty.facultyID

        });
    }

});



module.exports = router;