const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


let UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a Email'
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    role: {
        isStudent: {
            type: Boolean,
            trim: true,
            required: true,
            default: false
        },
        isFaculty: {
            type: Boolean,
            trim: true,
            required: true,
            default: false
        }
    }
});


//toJSON

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject,['_id','email']);
};


UserSchema.pre('save', function (next) {
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


let User = mongoose.model('User',UserSchema);

module.exports = {User};