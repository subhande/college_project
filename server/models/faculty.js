const mongoose = require('mongoose');

let facultySchema = new mongoose.Schema({
    facultyId: {
        type: Number,
        length: 10,
        trim: true
    },
    teaches: [{
        type: String,
        minlength: 1,
        trim: true
    }]
});


let Faculty = mongoose.model('Faculty',facultySchema);

module.exports = {Faculty};