const mongoose = require('mongoose');

let attendenceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student'
    },
    subject: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subject'
    },
    totalClass: {
        type: Number
    },
    totalAttended: {
        type: Number
    },
    record:[{
        date: {
            type: Date
        },
        attended:{
            type: Boolean
        }

    }]

});


let Attendence = mongoose.model('Attendence',attendenceSchema);

module.exports = {Attendence};