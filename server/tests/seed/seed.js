const {ObjectID} = require('mongodb');
const {User} = require('../../models/user');
const jwt = require('jsonwebtoken');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const userThreeID = new ObjectID();
const access = 'auth';


const users = [{
    _id: userOneID,
    email: 'subhan@gmail.com',
    password: 'useronepass',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id: userOneID,access},process.env.JWT_SECRET).toString()
    }]

},{
    _id: userTwoID,
    email: 'subhan1@gmail.com',
    password: 'usertwopass',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id: userTwoID,access},process.env.JWT_SECRET).toString()
    }]

},{
    _id: userThreeID,
    email: 'subhan12@gmail.com',
    password: 'userthreepass',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id: userThreeID,access},process.env.JWT_SECRET).toString()
    }]

}];

const populateUser = async () =>{
    try {
        await User.remove({});
        let userOne = await new User(users[0]).save();
        let userTwo = await new User(users[1]).save();
        let userThree = await new User(users[2]).save();
    } catch(e) {
        console.log(e);
    }
};

module.exports = { users, populateUser };