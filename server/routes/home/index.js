const express= require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const crypto = require('crypto');
const async = require('async');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const LocalStrategy = require('passport-local').Strategy;
require('../../auth/auth');

const {User} = require('../../models/user');


router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'home';
    next();

});



router.get('/', (req,res) => {
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
        res.render('home/index');
    }

});



router.get('/commingsoon', (req,res) => {
    res.render('home/conmingsoon');
});
router.get('/error', (req,res) => {
    res.render('home/error');
});
router.get('/notice', (req,res) => {
    res.render('home/notice');
});
router.get('/notice/:id', (req,res) => {
    res.render('home/noticeview');
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
        res.render('home/login');
    }


});

router.post('/login',async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    const redirect = user.role.isStudent ? "/student" : "/faculty";

    passport.authenticate('user',{
        successRedirect: redirect,
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);

});



router.get('/logout', (req,res) => {
    //console.log('Hello');
    req.logout();
    res.redirect('/login');
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
        res.render('home/register');
    }

});


router.post('/register', async (req, res) => {

    let errors = [];

    if(!req.body.firstName) {
        errors.push({message: 'please enter your first name'});
    }

    if(!req.body.lastName) {
        errors.push({message: 'please enter your last name'});
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

    if(!req.body.role) {
        errors.push({message: 'please select student or faculty'});
    }

    if(!req.body.passwordConfirm) {
        errors.push({message: 'This field can\'t be blank'});
    }


    if(req.body.password !== req.body.passwordConfirm) {
        errors.push({message: 'password field don\'t match'});
    }

    if(errors.length > 0){

        res.render('home/register', {

            errors: errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            role: req.body.role

        });

    } else {
        try {
            let user = await User.findOne({email: req.body.email});
            if(user){
                req.flash('error_message', 'That email exist please login');
                res.redirect('/register');
            } else {
                let newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    role: {
                       isStudent: req.body.role === 'student',
                       isFaculty: req.body.role === 'faculty'
                   }
                });


                let user = await newUser.save();
                res.redirect('/login');

            }
        } catch(e) {

        }

    }


});

router.get('/forgot', (req, res) => {
   res.render('home/forgot');
});

router.post('/forgot', function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                let token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 300000; // 5 mins

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {

            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: req.body.email,
                from: 'gita@edu.in',
                subject: 'Password Reset',
                html: '<strong> ' +
                'You are receiving this because you (or someone else) have requested the reset of the password for your account.<br>' +
                'Please click on the following link, or paste this into your browser to complete the process:<br><br>' +
                '<p>http://' + req.headers.host + '/reset/' + token + '</p><br><br>' +
                'If you did not request this, please ignore this email and your password will remain unchanged.<br>' +
                '</strong>',
            };
            sgMail.send(msg);
            req.flash('success_message', 'An e-mail has been sent to with further instructions.');
            done();
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
});



router.get('/reset/:token', function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
        }

        res.render('home/reset',{
            token: req.params.token
        });
    });
});


router.post('/reset/:token', function(req, res) {
    async.waterfall([
        function(done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }

                if (req.body.password !== req.body.confirmPassword) {
                    req.flash('error', 'Password didn\'t match');
                    return res.redirect('back');
                }

                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function(err) {
                    req.logIn(user, function(err) {
                        done(err, user);
                    });
                });
            });
        },
        function(user, done) {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            let msg = {
                to: user.email,
                from: 'gita@edu.in',
                subject: 'Your password has been changed',
                html: '<strong>Hello<br>' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.<br></strong>'
            };
            sgMail.send(msg);
            req.flash('success', 'Success! Your password has been changed.');
            done();
        }
    ], function(err) {
        res.redirect('/login');
    });
});


router.get('/commingsoon', (req, res) => {
    //TO Do : Render a comming soon page
});

router.get('/error', (req, res) => {
    //TO Do : Render a error page
});





module.exports = router;