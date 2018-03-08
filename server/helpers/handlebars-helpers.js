
const moment = require('moment');

const {User} = require('../models/user');
const {Student} = require('../models/student');
const {Enroll} = require('../models/enroll');



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
    }



};