const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


let UserSchema = new mongoose.Schema({
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
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';

  let token = jwt.sign({_id: user._id.toHexString(),access},process.env.JWT_SECRET);
  user.tokens.push({access,token});

  return user.save().then(() => {
    return token;
  });

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