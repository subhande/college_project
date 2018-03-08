const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');

const {User} = require('../../models/user');
const {Student} = require('../../models/student');
const {Faculty} = require('../../models/faculty');
const {Subject} = require('../../models/subject');
const {Attendence} = require('../../models/attendence');

router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'student';
    next();


});


router.get('/',async (req, res) => {
    const student = await Student.findOne({user: req.user._id}).populate({path:'user',model: 'User'});
    let subjects = await Subject.find({ students: {$in: [student._id]}})
        .populate({
            path: 'faculty',
            model: 'Faculty',
            select: '_id',
            populate:{
                path: 'user',
                model: 'User',
                select: ['firstName','lastName']
            }
        });
    let details = [];

    new Promise((resolve, reject) => {
        subjects.forEach((subject) => {
            Attendence.count({subject: subject._id}).then((total) => {
                Attendence.count({students: {$in: [student._id]},subject: subject._id}).then((attendance) => {
                    let data = {
                        faculty: subject.faculty.user.firstName +' '+ subject.faculty.user.lastName,
                        percentage: ((attendance/total)*100),
                        subject: subject.name
                    };

                    details.push(data);
                });
            })
        });
        resolve(details);
    }).then((details) => {
        res.render('student/attendance/index',{
            details: details
        });
    });


    //res.render('student/attendance/index');

});


module.exports = router;