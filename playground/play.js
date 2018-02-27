require('../server/config/config');


const {mongoose} = require('../server/db/mongoose');
const {ObjectID} = require('mongodb').ObjectID;
const {User} = require('../server/models/user');
const {Student} = require('../server/models/student');
const {Faculty} = require('../server/models/faculty');


// const users = [{
//     _id: new ObjectID(),
//     firstName: 'Subhan',
//     lastName: 'De',
//     username: 'subhande',
//     email: 'subhande@gmail.com',
//     password: 'abc123',
//     role: {isStudent: true}
// },{
//     _id: new ObjectID(),
//     firstName: 'Subh',
//     lastName: 'De',
//     username: 'subhde',
//     email: 'subhde@gmail.com',
//     password: 'abc123',
//     role: {isStudent: true}
// },{
//     _id: new ObjectID(),
//     firstName: 'Danial',
//     lastName: 'Alvas',
//     username: 'danialvas',
//     email: 'danialvas@gmail.com',
//     password: 'abc123',
//     role: {isFaculty: true}
// },{
//     _id: new ObjectID(),
//     firstName: 'June',
//     lastName: 'Alvarez',
//     username: 'alvarez69',
//     email: 'alvarez69@gmail.com',
//     password: 'abc123',
//     role: {isFaculty: true}
// }];
//
// const students = [{
//     _id: new ObjectID(),
//     user: users[0]._id,
//     regID: 1401287345,
//     rollNo: 141057,
//     courseName: 'B.Tech',
//     branch: 'CSE',
//     semester: '1st'
// },{
//     _id: new ObjectID(),
//     user: users[1]._id,
//     regID: 1401287345,
//     rollNo: 141057,
//     courseName: 'B.Tech',
//     branch: 'CSE',
//     semester: '1st'
// }];
//
// const faculties = [{
//     _id: new ObjectID(),
//     user: users[2]._id,
//     facultyID: '123456',
// },{
//     _id: new ObjectID(),
//     user: users[3]._id,
//     facultyID: '126964',
// }];
//
//
//
// const populate = async () => {
//     try {
//         await User.insertMany(users);
//         await Student.insertMany(students);
//         await Faculty.insertMany(faculties);
//     } catch(e) {
//         console.log(e);
//     }
// };
//
//
// populate();

Student.findOne({regID: 1401287345})
    .populate('user')
    .exec((err, student) => {
        if(err){
            console.log(err);
        }
        console.log(student.user.username);
    });



