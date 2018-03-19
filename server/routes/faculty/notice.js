const express = require('express');
const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');


const {User} = require('../../models/user');
const {Student} = require('../../models/student');
const {Faculty} = require('../../models/faculty');
const {Notice} = require('../../models/notice');

router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'faculty';
    next();


});


router.get('/', async (req, res) => {

    res.render('faculty/notice/index');

});

router.get('/all', async (req, res) => {
    let notices = await Notice.find({}).sort('-createdAt')
        .populate({
            path: 'author',
            model: 'User',
            select: ['firstName', 'lastName']
        });
    res.render('faculty/notice/viewall',{notices});

});

router.get('/remove/:id', async (req, res) => {
    let notices = await Notice.findOneAndRemove({_id: req.params.id});
    req.flash('success_message', 'Notice Removed');
    res.redirect('/faculty/notice/all');

});
router.post('/', async (req, res) => {

    let notice = new Notice({
        title: req.body.title,
        body: req.body.body,
        author: req.user._id,
    });

    await notice.save();
    req.flash('success_message', 'Notice Created');

    res.redirect('/faculty/notice/all');

});



module.exports = router;