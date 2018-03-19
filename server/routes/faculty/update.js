const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');


const {User} = require('../../models/user');
const {Student} = require('../../models/student');
const {Faculty} = require('../../models/faculty');

router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'faculty';
    next();


});

router.get('/',async (req, res) => {

    let faculty = await Faculty.findOne({user: req.user._id});

    res.render('faculty/update/index',{
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        username: req.user.username,
        email: req.user.email,
        facultyID: faculty.facultyID,
    });
});

router.post('/', async (req, res) => {
    let update = {
        $set : {
            'firstName' : req.body.firstName,
            'lastName' : req.body.lastName,
            'username' : req.body.username,
            'email' : req.body.email,
        }
    };
    await User.update({_id: req.user.id},update);
    await Faculty.findOneAndUpdate({user: req.user.id},{facultyID: req.body.facultyID});
    res.redirect('/faculty');
});

router.post('/info', async (req, res) => {
    const faculty = new Faculty({
       facultyID: req.body.facultyID,
       user: req.user._id
    });
    await faculty.save();
    res.redirect('/faculty');
});


router.get('/change',async (req, res) => {

    res.render('faculty/update/changepassword');
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
                res.redirect('/faculty');
            } else {
                req.flash('error_message', 'Password didn\'t match');
                res.redirect('/faculty/update/change');
            }
        } else {
            req.flash('error_message', 'Incorrect Old Password');
            res.redirect('/faculty/update/change');
        }
    });


});


module.exports = router;