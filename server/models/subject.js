const mongoose = require('mongoose');

let subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength:1
    },
    code: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength:1
    },
    faculty: {
        type: mongoose.Schema.ObjectId,
        ref: 'Faculty',
        default: null
    },
    students:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Student'
    }]
});


let Subject = mongoose.model('Subject',subjectSchema);

module.exports = {Subject};