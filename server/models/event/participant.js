const mongoose = require('mongoose');

let participantSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 1,
    },
    email: {
        type: String,
        trim: true,
        minlength: 1,
    },
    password: {
        type: String
    },
    contact: {
        type: Number,
        trim: true,
        length: 10,
    },
    college: {
        type: String,
        trim: true
    }

});


let Participant = mongoose.model('Participant',participantSchema);

module.exports = {Participant};