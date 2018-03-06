const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');


const {User} = require('../../models/user');
const {Student} = require('../../models/student');
const {Faculty} = require('../../models/faculty');
const {Subject} = require('../../models/subject');

router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'faculty';
    next();


});


router.get('/', async (req, res) => {

    const faculty = await Faculty.findOne({user: req.user._id});
    const subs = await Subject.find({faculty: faculty._id});

    res.render('faculty/subjects/index', {
        subs:subs
    });
});

router.patch('/:id', async (req, res) => {
    const subs = await Subject.findOneAndUpdate({_id: req.params.id},{faculty: null});
    res.redirect('/faculty/subjects');
});

router.get('/add', async (req, res) => {
    const subs = await Subject.find({faculty: null});
    res.render('faculty/subjects/add',{
        subs:subs
    });
});

router.post('/add', async (req, res) => {
    try {
        const sub = new Subject({
            name: req.body.name,
            code: req.body.code
        });
        await sub.save();
        res.redirect('/faculty/subjects/add');
    } catch(e){
        console.log(e);
    }
});

router.patch('/add/:id', async (req, res) => {
    const faculty = await Faculty.findOne({user: req.user._id});
    const subs = await Subject.findOneAndUpdate({_id: req.params.id},{faculty: faculty._id});
    res.redirect('/faculty/subjects/add');
});



module.exports = router;