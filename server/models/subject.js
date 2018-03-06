const mongoose = require('mongoose');

let subjectSchema = new mongoose.Schema({
    faculty: {
        type: mongoose.Schema.ObjectId,
        ref: 'Faculty',
        default: null
    },
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
    }
});


let Subject = mongoose.model('Subject',subjectSchema);

module.exports = {Subject};