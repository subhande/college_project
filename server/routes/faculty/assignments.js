const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');

const moment = require('moment');


const {User} = require('../../models/user');
const {Student} = require('../../models/student');
const {Faculty} = require('../../models/faculty');
const {Subject} = require('../../models/subject');
const {Assignment} = require('../../models/assignment');

router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'faculty';
    next();


});


router.get('/', async (req, res) => {

     const faculty = await Faculty.findOne({user: req.user._id});

     const assignment = await Assignment.find({faculty: faculty._id})
         .populate('subject','name');

    res.render('faculty/assignments/index', {
        assign:assignment
    });
});

router.delete('/:id', async (req, res) => {
    const subs = await Assignment.findOneAndRemove({_id: req.params.id});
    res.redirect('/faculty/assignments');
});

router.get('/add', async (req, res) => {
    const faculty = await Faculty.findOne({user: req.user._id});
    const subs = await Subject.find({faculty: faculty._id});

    res.render('faculty/assignments/add', {
        subs:subs
    });
});

router.post('/add', async (req, res) => {
    try {
        const faculty = await Faculty.findOne({user: req.user._id});
        const assignment = new Assignment({
            subject: req.body.subject,
            faculty: faculty._id,
            name: req.body.assignmentName,
            submissionDate: req.body.date
        });
        await assignment.save();
        res.redirect('/faculty/assignments');
    } catch(e){
        console.log(e);
    }
});




module.exports = router;