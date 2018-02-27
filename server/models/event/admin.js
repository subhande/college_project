const mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 1,
    },
    email: {
        type: String,
        trim: true,
        minlength: 1,
    },
    password: {
        type: String
    },
    contact: {
        type: Number,
        trim: true,
        length: 10,
    }

});


let Admin = mongoose.model('Admin',adminSchema);

module.exports = {Admin};