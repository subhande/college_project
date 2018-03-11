const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

let eventUserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 1,
        unique: true,
        required:true
    },
    username: {
        type: String,
        trim: true,
        minlength: 1,
        unique: true,
        required:true
    },
    email: {
        type: String,
        trim: true,
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a Email'
        },
        unique: true,
        required:true
    },
    password: {
        type: String,
        minlength: true,
        required: true
    },
    contact: {
        type: Number,
        trim: true,
        length: 10,
    },
    college: {
        type: String,
        trim: true,
        default: null
    },
    events: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Event'
    }],
    role: {
        type: String,
        default: null
    }

});

eventUserSchema.pre('save', function (next) {
    let user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password,salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }


});


let EventUser = mongoose.model('EventUser',eventUserSchema);

module.exports = {EventUser};