const mongoose = require('mongoose');

let enrollSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student'
    },
    subject: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subject'
    }
});


let Enroll = mongoose.model('Enroll',enrollSchema);

module.exports = {Enroll};