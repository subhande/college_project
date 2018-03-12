
const express= require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const {eventUserAuthenticated}  = require('../../helpers/authentication');




const {EventUser} = require('../../models/event/eventuser');
const {Event} = require('../../models/event/event');





router.all('/*',eventUserAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'event';
    next();

});



router.get('/',async (req,res) => {
    const date = new Date();
    const events = await Event.find({})
        .where({participants: {$in: [req.user._id]}});
    const uevents = await Event.find({date: {$gt: date}})
        .where({participants: {$nin: [req.user._id]}});
    const pevents = await Event.find({date: {$lt: date}});
    res.render('event/participant/index',{
        role: req.user.role,
        events: events,
        uevents:uevents,
        pevents:pevents
    });
});


router.get('/event/:id',async (req,res) => {
    const event = await Event.findOne({_id:req.params.id})
        .populate({
            path: 'admins',
            model: 'EventUser',
            select: ['name','email','contact']
        })
        .populate({
            path: 'participants',
            model: 'EventUser',
            select: ['name']
        })
        .populate({
            path: 'winners.user',
            model: 'EventUser',
            select: ['name']
        });
    //console.log(event);
    res.render('event/participant/event',{
        role: req.user.role,
        event: event
    });
});

router.get('/participate/:id',async (req,res) => {

    const event = await Event.findOne({_id: req.params.id});
    event.participants.push(req.user._id);
    await event.save();
    res.redirect('/event/participant');
});

router.get('/withdraw/:id',async (req,res) => {

    const event = await Event.findOne({_id: req.params.id});
    event.participants.pull(req.user._id);
    await event.save();
    res.redirect('/event/participant');
});






module.exports = router;