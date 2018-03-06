const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');

const {User} = require('../../models/user');
const {Subject} = require('../../models/subject');
const {Faculty} = require('../../models/faculty');
const {Student} = require('../../models/student');
const {Enroll} = require('../../models/enroll');


router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'student';
    next();


});


router.get('/',async (req, res) => {

    try {
        const student = await Student.findOne({user: req.user._id});
        const enrolls = await Enroll.find({student: student._id})
            .populate({
                path: 'subject',
                model: 'Subject',
                populate:{
                    path: 'faculty',
                    model: 'Faculty',
                    select: '_id',
                    populate:{
                        path: 'user',
                        model: 'User',
                        select: ['firstName','lastName']
                    }
                }
            });
        res.render('student/subject/index', {
            enrolls: enrolls
        });
    } catch(e) {
        res.render('student/subject/index');
    }

});


router.delete('/:id',async (req, res) => {

    try {
        const enrolls = await Enroll.findOneAndRemove({_id: req.params.id});
        res.redirect('/student/subject');
    } catch(e) {
        res.redirect('/student/subject');
    }

});

router.get('/add',async (req, res) => {

    try{
        const student = await Student.findOne({user: req.user._id});
        const subjects = await Subject
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

        subjects.map(subject => {
           subject.sid = student._id;
           return subject;
        });
        res.render('student/subject/add', {
            subs:subjects
        });
    } catch(e) {

    }

});

router.post('/add/:id', async (req, res) => {
   try{
       const student = await Student.findOne({user: req.user._id});
       const enroll = new Enroll({
           student: student._id,
           subject: req.params.id
       });

       await enroll.save();
       res.redirect('/student/subject');
   } catch(e) {
       console.log(e);
       res.redirect('/student/subject');
   }

});


module.exports = router;