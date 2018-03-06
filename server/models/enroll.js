const mongoose = require('mongoose');

let enrollSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student',
        required: true
    },
    subject: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subject',
        required: true
    }
});


let Enroll = mongoose.model('Enroll',enrollSchema);

module.exports = {Enroll};