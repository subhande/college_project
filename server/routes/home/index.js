const express= require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const {User} = require('../../models/user');



router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'home';
    next();

});



router.get('/', (req,res) => {
    res.render('home/index');
});


router.get('/login', (req,res) => {
    res.render('home/login');
});


passport.use(new LocalStrategy({usernameField: 'email'},async (email, password, done) => {

    const user = await User.findOne({email});
    if(!user){
        return done(null, false, {message: 'No user found'});
    }

    bcrypt.compare(password, user.password, (err, matched) => {

        if(err) return err;

        if(matched) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Incorrect password'});
        }
    });


}));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


router.post('/login', (req, res, next) => {

    passport.authenticate('local',{
        successRedirect: '/student',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);

});



router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/login');
});


router.get('/register', (req,res) => {

    res.render('home/register');

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




// router.post('/users',async (req, res) => {
//     try {
//         const body = _.pick(req.body,['email','password']);
//
//         const user = new User(body);
//
//         await user.save();
//         const token = await user.generateAuthToken();
//         res.header('x-auth',token).send(user);
//     } catch(e) {
//         res.status(400).send(e);
//     }
// });
//
//
// router.get('/users/me', authenticate, async (req, res) => {
//     res.send(req.user);
// });
//
//
// router.post('/users/login', async (req, res) => {
//     try {
//
//         const body = _.pick(req.body,['email','password']);
//         const user = await User.findByCredentials(body.email,body.password);
//         //console.log(user);
//         const token = await user.generateAuthToken();
//         //console.log(token);
//         res.header('x-auth',token).send(user);
//
//     } catch(err){
//         res.status(400).send();
//     }
// });
//
//
// router.delete('/users/me/token', authenticate,async (req, res) => {
//
//     try{
//         await req.user.removeToken(req.token);
//         res.status(200).send();
//     } catch(e) {
//         res.status(400).send();
//     }
//
// });


module.exports = router;