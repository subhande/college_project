const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');


const {User} = require('../../models/user');
const {Student} = require('../../models/student');

router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'student';
    next();


});


router.get('/', async (req, res) => {
    try {
        const student = await Student.findOne({user: req.user._id});
        if(!student) {
            res.render('student/update/updateinfo');
        } else {
            res.render('student/index',{
                name: req.user.firstName + ' ' + req.user.lastName,
                username: req.user.username,
                email: req.user.email,
                course: student.courseName,
                branch: student.branch,
                sem: student.semester,
                rollno: student.rollNo,
                regID: student.regID,
            });
        }
    } catch(e) {

    }
    // res.render('student/index',{
    //     name: req.user.firstName + ' ' + req.user.lastname,
    //     username: req.user.username
    // });

});




module.exports = router;