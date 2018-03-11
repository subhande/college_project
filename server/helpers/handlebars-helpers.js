
const moment = require('moment');

const {User} = require('../models/user');
const {Student} = require('../models/student');



module.exports = {

    selectRole: function(role, option){
        if(role === option){
            return "checked";
        }
    },

    formatDate: function (date) {
        return moment(date).format("DD-MM-YYYY");
    },

    select: function(value, desiredValue) {
        if(value === desiredValue){
            return 'selected';
        } else {
            return '';
        }
    },

    isParticipant: function(role){
        return role === 'participant';
    },

    isAdmin: function(role){
        return role === 'admin';
    },

    ifCond: function(v1,v2){
        return !!(v1 && v2);
    },

    eqCheck: function(v1,v2){
        return v1 === v2;
    }



};