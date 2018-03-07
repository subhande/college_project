
const moment = require('moment');

const {User} = require('../models/user');
const {Student} = require('../models/student');
const {Enroll} = require('../models/enroll');

let isEnrolledAsync = async function(id, sid) {
    try{
        const enroll = await Enroll.findOne({student: sid, subject: id});
        if(enroll) {
            return false;
        } else {
            return true;
        }
    } catch(e){
        console.log('error');
    }
};

module.exports = {

    selectRole: function(role, option){
        if(role === option){
            return "checked";
        }
    },

    formatDate: function (date) {
        return moment(date).format("DD-MM-YYYY");
    },

    isEnrolled: function(id, sid) {
        return isEnrolledAsync(id, sid).then((res) => {
            //console.log(res);
            if(res) {
                return true;
            } else {
                return null;
            }
        });
    }



};