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

    //To DO: Render a change password page

    //res.render('faculty/update/index');
});

router.get('/change',async (req, res) => {

    //To DO: change password

    //res.render('faculty/update/index');

    let user = await User.findOne({_id: req.user.id});

    if(req.body.password === req.body.confirmPassword) {
        user.password = req.body.password;
        await user.save();

    }





});


module.exports = router;