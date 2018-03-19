const mongoose = require('mongoose');

let noticeSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true});


let Notice = mongoose.model('Notice',noticeSchema);

module.exports = {Notice};