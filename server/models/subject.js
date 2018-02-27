const mongoose = require('mongoose');

let subjectSchema = new mongoose.Schema({
    faculty: {
        type: mongoose.Schema.ObjectId,
        ref: 'Faculty'
    },
    name: {
        type: String,
        trim: true,
        minlength:1
    },
    code: {
        type: String,
        trim: true,
        minlength:1
    }
});


let Subject = mongoose.model('Subject',subjectSchema);

module.exports = {Subject};