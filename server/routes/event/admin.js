
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
    const events = await Event.find({});
    const uevents = await Event.find({date: {$gt: date}});
    const pevents = await Event.find({date: {$lt: date}});
    res.render('event/admin/index',{
        role: req.user.role,
        events: events,
        uevents:uevents,
        pevents:pevents
    });
});

router.get('/create',async (req,res) => {

    res.render('event/admin/create',{
        role: req.user.role
    });
});

router.post('/create',async (req,res) => {
    //console.log(req.body);
    const event = new Event({
        name: req.body.name,
        venue: req.body.venue,
        startTime: req.body.time,
        date: req.body.date,
        desc: req.body.desc,
    });

    event.admins.push(req.user._id);

    await event.save();

    res.redirect('/event/admin/');
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
            select: ['name','email','contact']
        })
        .populate({
            path: 'winners.user',
            model: 'EventUser',
            select: ['name','email','contact']
        });
    //console.log(event);
    res.render('event/admin/event',{
        role: req.user.role,
        event: event
    });
});







module.exports = router;