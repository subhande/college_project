const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');

const {User} = require('../../models/user');
const {Student} = require('../../models/student');


router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'student';
    next();


});


router.get('/', (req, res) => {

    //TO DO : Fetch assignments related to specific students

    res.render('student/update/index');

});


router.post('/', (req, res) => {

    //TO DO : Update the student details
    console.log(req.body);

    res.render('student/update/index');

});

router.get('/info', (req, res) => {

    res.render('student/update/updateinfo');

});


router.post('/info', async (req, res) => {

    // TO DO :
    // create documnet in student and redirect to dashboard

    try{

        const student = new Student({
            user: req.user._id,
            regID: req.body.regID,
            rollNo: req.body.rollNo,
            courseName: req.body.course,
            branch: req.body.branch,
            semester: req.body.sem
        });

        await student.save();
        const newStudent = await Student.findOne({user: req.user._id});
        res.redirect('/student');

    } catch(e) {

    }


});


module.exports = router;