
const express= require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');


const {EventUser} = require('../../models/event/eventuser');
const {Event} = require('../../models/event/event');



const {User} = require('../../models/user');



router.all('/*', (req, res, next) => {
    console.log(req.user);
    req.app.locals.layout = 'event';
    next();

});



router.get('/', (req,res) => {
    res.render('event/participant/index');
});






module.exports = router;