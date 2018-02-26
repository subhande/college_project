const mongoose = require('mongoose');

let StudentSchema = new mongoose.Schema({
    regId: {
        type: Number,
        length: 10,
        trim: true
    },
    rollNo: {
        type: Number,
        length: 6,
        trim: true
    },
    courseName: {
        type: String,
        minlength: 1,
        trim: true,
        unique:true
    },
    branch: {
        type: String,
        minlength: 1,
        trim: true,
    },
    semester: {
        type: String,
        minlength: 1,
        trim: true
    },
    primarySubjects: [{
        subjects: {
            type: String,
            minlength: 1,
            trim: true
        }
    }],
    optionalSubjects: [{
        subjects: {
            type: String,
            minlength: 1,
            trim: true
        }
    }]
});


let Student = mongoose.model('Student',StudentSchema);

module.exports = {Student};