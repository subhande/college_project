
const moment = require('moment');
module.exports = {

    selectRole: function(role, option){
        if(role === option){
            return "checked";
        }
    },

    formatDate: function (date) {
        return moment(date).format("DD-MM-YYYY");
    }

};