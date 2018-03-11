const express= require('express');
const router = express.Router();


const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const {EventUser} = require('../models/event/eventuser');
const {User} = require('../models/user');


passport.use('user',new LocalStrategy({usernameField: 'email'},async (email, password, done) => {

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


passport.use('euser', new LocalStrategy({usernameField: 'email'},async (email, password, done) => {


    const user = await EventUser.findOne({email});

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

passport.deserializeUser(async function(id, done) {
    let user = await User.findById(id);
    let euser = await EventUser.findById(id);

    if(user){
        done(null, user);
    } else if(euser) {
        done(null, euser);
    }

});
