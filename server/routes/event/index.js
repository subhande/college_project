
const express= require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('../../auth/auth');


const {EventUser} = require('../../models/event/eventuser');
const {Event} = require('../../models/event/event');





router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'event';
    next();

});



router.get('/',async (req,res) => {
    //console.log(req.user);
    if(req.isAuthenticated()){
        if(req.user.role.hasOwnProperty('isStudent')){
            const redirect = req.user.role.isStudent ? "/student" : "/faculty";
            res.redirect(redirect);
        } else {
            const redirect = (req.user.role === 'admin') ? "/event/admin" : "/event/participant";
            res.redirect(redirect);
        }
    } else {
        const date = new Date();
        const events = await Event.find({date: {$gt: date}});
        res.render('event/index',{events});
    }

});

router.get('/login', (req,res) => {

    if(req.isAuthenticated()){
        if(req.user.role.hasOwnProperty('isStudent')){
            const redirect = req.user.role.isStudent ? "/student" : "/faculty";
            res.redirect(redirect);
        } else {
            const redirect = (req.user.role === 'admin') ? "/event/admin" : "/event/participant";
            res.redirect(redirect);
        }
    } else {
        res.render('event/login');
    }

});

router.get('/register', (req,res) => {
    if(req.isAuthenticated()){
        if(req.user.role.hasOwnProperty('isStudent')){
            const redirect = req.user.role.isStudent ? "/student" : "/faculty";
            res.redirect(redirect);
        } else {
            const redirect = (req.user.role === 'admin') ? "/event/admin" : "/event/participant";
            res.redirect(redirect);
        }
    } else {
        res.render('event/register');
    }

});

router.post('/register',async (req,res) => {
    //console.log(req.body);
    let errors = [];

    if(!req.body.name) {
        errors.push({message: 'please enter your name'});
    }

    if(!req.body.email) {
        errors.push({message: 'please enter your email'});
    }

    if(!req.body.password) {
        errors.push({message: 'please enter your password'});
    }

    if(!req.body.username) {
        errors.push({message: 'please enter your username'});
    }

    if(!req.body.contact) {
        errors.push({message: 'please enter your contact no'});
    }

    if(!req.body.college && req.body.role === 'participant') {
        errors.push({message: 'please enter your college name'});
    }

    if(!req.body.role) {
        errors.push({message: 'please select admin or participant'});
    }

    if(!req.body.passwordConfirm) {
        errors.push({message: 'This field can\'t be blank'});
    }


    if(req.body.password !== req.body.passwordConfirm) {
        errors.push({message: 'password field don\'t match'});
    }

    if(errors.length > 0){

        res.render('event/register', {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            college: req.body.college,
            contact: req.body.contact,
            role: req.body.role,
            errors:errors
        });

    } else {
        try {
            let userExist = await EventUser.findOne({email: req.body.email});
            if(userExist){
                req.flash('error_message', 'That email exist please login');
                res.redirect('/event/login');
            } else {
                let user = new EventUser({
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    college: (req.body.role === 'admin') ? null : req.body.college,
                    contact: req.body.contact,
                    role: req.body.role
                });
                await user.save();
                res.redirect('/event/login');

            }
        } catch(e) {
            console.log(e);
        }

    }
});


router.post('/login',async (req, res, next) => {
    try {
        const user = await EventUser.findOne({email: req.body.email});


        const redirect = (user.role === 'admin') ? "/event/admin" : "/event/participant";

        passport.authenticate('euser',{
            successRedirect: redirect,
            failureRedirect: '/event/login',
            failureFlash: true
        })(req, res, next);


    } catch(e) {
        passport.authenticate('euser',{
            successRedirect: "/error",
            failureRedirect: '/event/login',
            failureFlash: true
        })(req, res, next);
    }

});



router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/event/login');
});





module.exports = router;