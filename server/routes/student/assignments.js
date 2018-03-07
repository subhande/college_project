const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');

const {User} = require('../../models/user');
const {Student} = require('../../models/student');
const {Faculty} = require('../../models/faculty');
const {Subject} = require('../../models/subject');
const {Assignment} = require('../../models/assignment');

router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'student';
    next();


});


router.get('/', async (req, res) => {

    const student = await Student.findOne({user: req.user._id});
    let assignments = await Assignment.find({ 'students.student' : {$in: [student._id]}})
        .populate({
            path: 'faculty',
            model: 'Faculty',
            select: 'user',
            populate: {
                path: 'user',
                model: 'User',
                select: ['firstName','lastName']
            }
        })
        .populate({
            path: 'subject',
            model: 'Subject'
        });
    //console.log(assignments);
    res.render('student/assignments/index',{
        assignments:assignments
    });

});


module.exports = router;