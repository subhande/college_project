const mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
    question: {
      type: String,
      trim: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    tags:{
        type: String,
        trim: true
    },
    desc:{
        type: String,
        trim: true
    },
    qdate:{
        type: Date
    },
    answers: [{
        answer:{
            type: String,
            trim: true,
        },
        user:{
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        isApproved:{
            type: Boolean
        },
        upvotes:{
            type: Number,
            default: 0
        },
        adate:{
            type: Date
        },
    }]

});


let Question = mongoose.model('Question',questionSchema);

module.exports = {Question};