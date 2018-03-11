
const express= require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const {eventUserAuthenticated}  = require('../../helpers/authentication');




const {EventUser} = require('../../models/event/eventuser');
const {Event} = require('../../models/event/event');





router.all('/*',eventUserAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'event';
    next();

});



router.get('/', (req,res) => {
    console.log(req);
    res.render('event/admin/index',{
        role: req.user.role
    });
});






module.exports = router;