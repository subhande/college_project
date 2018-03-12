const mongoose = require('mongoose');

let eventSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 1,
    },
    startTime: {
        type: String
    },
    date: {
        type: Date
    },
    venue: {
        type: String,
        trim:  true,
        minlength:1,
    },
    desc: {
        type: String,
        trim: true
    },
    admins:[{
        type: mongoose.Schema.ObjectId,
        ref: 'EventUser'
    }],
    participants:[{
        type: mongoose.Schema.ObjectId,
        ref: 'EventUser'
    }],
    winners:[{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'EventUser'
        },
        pos: {
            type: String
        }
    }]


});


let Event = mongoose.model('Event',eventSchema);

module.exports = {Event};