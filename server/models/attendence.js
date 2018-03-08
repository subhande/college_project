const mongoose = require('mongoose');

let attendenceSchema = new mongoose.Schema({
    students: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Student'
    }],
    subject: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subject'
    },
    date: {
        type: Date
    }

});


let Attendence = mongoose.model('Attendence',attendenceSchema);

module.exports = {Attendence};