const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');


const {User} = require('../../models/user');
const {Student} = require('../../models/student');
const {Faculty} = require('../../models/faculty');
const {Subject} = require('../../models/subject');
const {Attendence} = require('../../models/attendence');

router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'faculty';
    next();


});


router.get('/', async (req, res) => {
    const faculty = await Faculty.findOne({user: req.user._id});
    const subs = await Subject.find({faculty: faculty._id});
    res.render('faculty/attendance/index',{
        subs: subs
    });
});

router.post('/', async (req, res) => {
    //console.log(req.body);
    const subject = await Subject.findOne({_id: req.body.subject})
        .populate({
            path: 'students',
            model: 'Student',
            populate:{
                path: 'user',
                model: 'User',
                select: ['firstName', 'lastName']
            }
        });
    //console.log(subject);
    res.render('faculty/attendance/update',{
        subject: subject,
        date: req.body.date
    });

});


router.post('/update',async (req, res) => {
    //console.log(req.body);
    //console.log(req.body.students.length);

    const attendance = new Attendence({
        subject: req.body.id,
        date: req.body.date,
    });

    if(Array.isArray(req.body.students)){
        req.body.students.forEach(student => attendance.students.push(student));
    } else {
        attendance.students.push(req.body.students);
    }



    await attendance.save();

    res.redirect('/faculty/attendance');
});

router.post('/show',async (req, res) => {
    //console.log(req.body.subject);
    const subject = await Subject.findOne({_id: req.body.subject});
    //console.log(subject.students);
    const details =[];
    // subject.students.forEach(async (student) => {
    //     const total = await Attendence.count({subject: req.body.subject});
    //     const attendance = await Attendence.count({students: {$in: [student]}});
    //     const tstudent = await Student.findOne({_id: student}).populate({path:'user',model:'User'});
    //     //console.log(tstudent);
    //     let data = {
    //         name: tstudent.user.firstName +' '+ tstudent.user.lastName,
    //         percen: ((attendance/total)*100)
    //     };
    //
    //     details.push(data);
    //
    //     console.log(data);
    //
    // });

    new Promise((resolve, reject) => {
        subject.students.forEach(async (student) => {
            Attendence.count({subject: req.body.subject}).then((total) => {
                Attendence.count({subject: req.body.subject, students: {$in: [student]}}).then((attendance) => {
                    Student.findOne({_id: student}).populate({path:'user',model:'User'}).then((tstudent) => {
                        let data = {
                            name: tstudent.user.firstName +' '+ tstudent.user.lastName,
                            percen: ((attendance/total)*100),
                            subject: subject.name
                        };

                        details.push(data);

                        console.log(data);
                        resolve(details);
                    });
                });
            })
        });
        //resolve(details);
    }).then((details) => {
        res.render('faculty/attendance/show',{
            details: details
        });
    });




});



module.exports = router;