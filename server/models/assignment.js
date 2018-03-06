const mongoose = require('mongoose');

let assigmentSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subject',
        required: true
    },
    faculty: {
        type: mongoose.Schema.ObjectId,
        ref: 'Faculty',
        required: true
    },
    name: {
        type: String,
        trim: true,
        minlength: 1,
        unique: true,
        required: true
    },
    submissionDate: {
        type: Date
    }
});


let Assignment = mongoose.model('Assignment',assigmentSchema);

module.exports = {Assignment};