const mongoose = require('mongoose');

let facultySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    facultyID: {
        type: Number,
        length: 6,
        trim: true
    }
});


let Faculty = mongoose.model('Faculty',facultySchema);

module.exports = {Faculty};