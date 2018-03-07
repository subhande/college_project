const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');

const {User} = require('../../models/user');
const {Subject} = require('../../models/subject');
const {Faculty} = require('../../models/faculty');
const {Student} = require('../../models/student');
const {Assignment} = require('../../models/assignment');


router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'student';
    next();


});


router.get('/',async (req, res) => {

    try {
        const student = await Student.findOne({user: req.user._id});
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
        res.render('student/subject/index', {
            subs: subjects
        });
    } catch(e) {
        res.render('student/subject/index');
    }

});


router.patch('/:id',async (req, res) => {

    try {
        const student = await Student.findOne({user: req.user._id});

        await Subject.update({_id: req.params.id},{$pull: {students: student._id}});

        await Assignment.update({subject: req.params.id},{$pull: {students:{$in: {student: student._id}}}}, {multi: true});

        res.redirect('/student/subject');
    } catch(e) {
        console.log(e);
        res.redirect('/student/subject');
    }

});

router.get('/add',async (req, res) => {

    try{
        const student = await Student.findOne({user: req.user._id});
        let subjects = await Subject.find({ students: {$nin: [student._id]}})
            .where("faculty").ne(null)
            .populate({
                path: 'faculty',
                model: 'Faculty',
                select: 'user',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: ['firstName','lastName']
                }
            }).exec();

        //console.log(subjects);

        res.render('student/subject/add', {
            subs: subjects
        });
    } catch(e) {
        console.log(e);
    }

});

router.post('/add/:id', async (req, res) => {
   try{
       const student = await Student.findOne({user: req.user._id});

       await Subject.update({_id: req.params.id},{$push: {students: student._id}});

       await Assignment.update({subject: req.params.id},{$push: {students: {student: student._id, submitted: false}}}, {multi: true});

       res.redirect('/student/subject');
   } catch(e) {
       console.log(e);
       res.redirect('/student/subject');
   }

});


module.exports = router;