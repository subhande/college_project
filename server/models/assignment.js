const mongoose = require('mongoose');

let assigmentSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subject'
    },
    name: {
        type: String,
        trim: true,
        minlength: 1
    },
    submitionDate: {
        type: Date
    }
});


let Assignment = mongoose.model('Assignment',assigmentSchema);

module.exports = {Assignment};