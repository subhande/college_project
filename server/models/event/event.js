const mongoose = require('mongoose');

let eventSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 1,
    },
    startTime: {
        type: Date
    },
    date: {
        type: Date
    },
    vanue: {
        type: String,
        trim:  true,
        minlength:1,
    },
    desc: {
        type: String,
        trim: true
    },
    admin: {
        type: mongoose.Schema.ObjectId,
        ref: 'Admin'
    }

});


let Event = mongoose.model('Event',eventSchema);

module.exports = {Event};