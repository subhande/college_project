const mongoose = require('mongoose');

let StudentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    regID: {
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
    },
    branch: {
        type: String,
        minlength: 1,
        trim: true,
        default: null
    },
    semester: {
        type: String,
        minlength: 1,
        trim: true
    }
});



let Student = mongoose.model('Student',StudentSchema);

module.exports = {Student};