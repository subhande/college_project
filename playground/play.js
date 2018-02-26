require('../server/config/config');


const {mongoose} = require('../server/db/mongoose');
const {User} = require('../server/models/user');
const {Student} = require('../server/models/student');

//Test User


// let body = {
//     firstName: 'Subhan',
//     lastName: 'De',
//     username: 'subhande',
//     email: 'subhande@gmail.com',
//     password: '123abc@'
// };
//
// let user  = new User(body);
//
// user.save().then(() => {
//     console.log("Worked");
// }).catch(e => console.log(e));


//Test Student

let sbody = {
    regId: 1401287345,
    rollNo: 141057,
    courseName: 'B.tech',
    branch: 'CSE',
    semester: '8th'
};

let student  = new Student(sbody);

student.save().then(() => {
    console.log("Worked");
}).catch(e => console.log(e));


