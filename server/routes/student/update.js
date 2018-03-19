const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');
const bcrypt = require('bcryptjs');

const {User} = require('../../models/user');
const {Student} = require('../../models/student');


router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'student';
    next();


});


router.get('/', async (req, res) => {

    const student = await Student.findOne({user: req.user._id});

    res.render('student/update/index',{
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        username: req.user.username,
        email: req.user.email,
        regID: student.regID,
        rollNo: student.rollNo,
        courseName: student.courseName,
        branch: student.branch,
        semester: student.semester,
    });

});


router.post('/', async (req, res) => {
    //console.log(req.body);
    let updateUser = {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
        }
    };

    let updateStudent = {
        $set: {
            regID: req.body.regID,
            rollNo: req.body.rollNo,
            courseName: req.body.course,
            branch: req.body.branch,
            semester: req.body.sem,
        }
    };

    await User.update({_id: req.user._id},updateUser);
    await Student.update({user: req.user._id},updateStudent);

    res.redirect('/student');

});



router.get('/info', (req, res) => {

    res.render('student/update/updateinfo');

});





router.post('/info', async (req, res) => {

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

router.get('/change',async (req, res) => {

    res.render('student/update/changepassword');
});

router.post('/change',async (req, res) => {

    bcrypt.compare(req.body.opass, req.user.password, async (err, matched) => {

        if(err) return err;

        if(matched) {
            if(req.body.npass === req.body.cnpass){
                let user = await User.findOne({_id: req.user.id});
                user.password = req.body.npass;
                await user.save();
                req.flash('success_message', 'Password Changed Successfully');
                res.redirect('/student');
            } else {
                req.flash('error_message', 'Password didn\'t match');
                res.redirect('/student/update/change');
            }
        } else {
            req.flash('error_message', 'Incorrect Old Password');
            res.redirect('/student/update/change');
        }
    });


});



module.exports = router;