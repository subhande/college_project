const express = require('express');

const router = express.Router();
const {userAuthenticated}  = require('../../helpers/authentication');

const moment = require('moment');

const {User} = require('./../../models/user');
const {Faculty} = require('./../../models/faculty');
// const {faculty} = require('./../../models/faculty');
const {Question} = require('./../../models/question');
router.all('/*', userAuthenticated, (req, res, next)=>{


    req.app.locals.layout = 'faculty';
    next();


});



router.get('/search', (req, res) => {

    res.render('faculty/questions/search');

});


router.post('/search', async (req, res) => {

    const questions2 = await Question.find({desc: new RegExp(req.body.search, 'i')});
    const questions1 = await Question.find({question: new RegExp(req.body.search, 'i')});
    const questions3 = await Question.find({tags: new RegExp(req.body.search, 'i')});

    // console.log('1:',questions1);
    // console.log('2:',questions2);
    // console.log('3:',questions3);

    if(questions1.length >= questions2.length && questions1.length >= questions3.length){
        res.render('faculty/questions/index',{
            questions:questions1
        });
    } else if(questions2.length > questions3.length){
        res.render('faculty/questions/index',{
            questions:questions2
        });
    }else if(questions3.length > 0){
        res.render('faculty/questions/index',{
            questions:questions3
        });
    } else {
        res.render('faculty/questions/index',{
            nomatch:"No Match Found"
        });
    }


});

router.get('/ask', (req, res) => {

    res.render('faculty/questions/ask');

});

router.post('/ask',async (req, res) => {
    //console.log(req.body);

    const que = new Question({
        question: req.body.question,
        tags: req.body.tags,
        desc: req.body.desc,
        user: req.user._id,
        qdate: moment().format()
    });

    await que.save();

    res.redirect('/faculty/questions/myquestions');

});

router.get('/myquestions',async (req, res) => {

    const questions = await Question.find({user: req.user._id});
    //console.log(questions);
    res.render('faculty/questions/myquestions',{
        questions: questions
    });

});

router.get('/myanswers',async (req, res) => {

    const questions = await Question.find({answers: {$elemMatch: {user: req.user._id}}});
    //console.log(questions);
    res.render('faculty/questions/myanswers',{
        questions: questions
    });


});


router.get('/question/:id',async (req, res) => {
    //console.log(req.params);
    const que = await Question.findOne({_id: req.params.id})
        .populate({
            path: 'user',
            model: 'User',
            select: ['firstName', 'lastName']
        })
        .populate({
            path: 'answers.user',
            model: 'User',
            select: ['firstName', 'lastName']
        });
    res.render('faculty/questions/question',{
        que: que
    });

});


router.post('/question/:id',async (req, res) => {
    //console.log(req.body);
    const que = await Question.findOne({_id: req.params.id});

    que.answers.push({
        answer: req.body.answer,
        user: req.user._id,
        isApproved: false,
        upvotes: 0,
        adate: moment().format()
    });

    await que.save();

    res.redirect(`/faculty/questions/question/${req.params.id}`);

});

router.get('/question/approve/:qid/:aid',async (req, res) => {
    //console.log(req.params);
    const que = await Question.update({_id: req.params.qid,'answers._id':{$in: [req.params.aid]}},
        {
            '$set': {
                'answers.$.isApproved': true
            }
        }
        );
    console.log(que);
    res.redirect(`/faculty/questions/question/${req.params.qid}`);

});

router.get('/question/unapprove/:qid/:aid',async (req, res) => {
    //console.log(req.params);
    const que = await Question.update({_id: req.params.qid,'answers._id':{$in: [req.params.aid]}},
        {
            '$set': {
                'answers.$.isApproved': false
            }
        }
    );
    console.log(que);
    res.redirect(`/faculty/questions/question/${req.params.qid}`);

});

router.get('/question/upvote/:qid/:aid',async (req, res) => {
    //console.log(req.params);
    const que = await Question.update({_id: req.params.qid,'answers._id':{$in: [req.params.aid]}},
        {
            $inc: {
                'answers.$.upvotes': 1
            }
        }
    );
    console.log(que);
    res.redirect(`/faculty/questions/question/${req.params.qid}`);



});

router.get('/unanswered', async (req, res) => {

    const questions = await Question.find({answers: {$exists: true, $eq: []}});

    res.render('faculty/questions/index',{
        questions:questions
    });

});


module.exports = router;