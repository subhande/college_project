require('../../server/config/config');


const {mongoose} = require('../../server/db/mongoose');
const {ObjectID} = require('mongodb').ObjectID;
const {User} = require('../../server/models/user');
const {Student} = require('../../server/models/student');
const {Faculty} = require('../../server/models/faculty');
const {Subject} = require('../../server/models/subject');
const {Enroll} = require('../../server/models/enroll');
const {StudentAssignment} = require('../../server/models/student_assignment');


const users = [{
    _id: new ObjectID(),
    firstName: 'Subhan',
    lastName: 'De',
    username: 'subhande',
    email: 'subhande@gmail.com',
    password: 'abc123',
    role: {isStudent: true}
},{
    _id: new ObjectID(),
    firstName: 'Subh',
    lastName: 'De',
    username: 'subhde',
    email: 'subhde@gmail.com',
    password: 'abc123',
    role: {isStudent: true}
},{
    _id: new ObjectID(),
    firstName: 'Danial',
    lastName: 'Alvas',
    username: 'danialvas',
    email: 'danialvas@gmail.com',
    password: 'abc123',
    role: {isStudent: true}
},{
    _id: new ObjectID(),
    firstName: 'June',
    lastName: 'Alvarez',
    username: 'alvarez69',
    email: 'alvarez69@gmail.com',
    password: 'abc123',
    role: {isStudent: true}
},{
    _id: new ObjectID(),
    firstName: 'May',
    lastName: 'Z',
    username: 'mayz123',
    email: 'mayz123@gmail.com',
    password: 'abc123',
    role: {isStudent: true}
},{
    _id: new ObjectID(),
    firstName: 'Skye',
    lastName: 'Johanson',
    username: 'skye007',
    email: 'skye007@gmail.com',
    password: 'abc123',
    role: {isFaculty: true}
},{
    _id: new ObjectID(),
    firstName: 'Sahra',
    lastName: 'Lance',
    username: 'sahrahlance',
    email: 'sahrahlance@gmail.com',
    password: 'abc123',
    role: {isFaculty: true}
},{
    _id: new ObjectID(),
    firstName: 'Ava',
    lastName: 'Martinez',
    username: 'martinageava',
    email: 'martinageava@gmail.com',
    password: 'abc123',
    role: {isFaculty: true}
}];

const students = [{
    _id: new ObjectID(),
    user: users[0]._id,
    regID: 1401287345,
    rollNo: 141055,
    courseName: 'B.Tech',
    branch: 'CSE',
    semester: '3rd'
},{
    _id: new ObjectID(),
    user: users[1]._id,
    regID: 1401287346,
    rollNo: 141056,
    courseName: 'B.Tech',
    branch: 'ECE',
    semester: '2nd'
},{
    _id: new ObjectID(),
    user: users[2]._id,
    regID: 1401287347,
    rollNo: 141057,
    courseName: 'B.Tech',
    branch: 'ME',
    semester: '8th'
},{
    _id: new ObjectID(),
    user: users[3]._id,
    regID: 1401287348,
    rollNo: 141058,
    courseName: 'MBA',
    semester: '6th'
},{
    _id: new ObjectID(),
    user: users[4]._id,
    regID: 1401287349,
    rollNo: 141059,
    courseName: 'MCA',
    semester: '5th'
}];

const faculties = [{
    _id: new ObjectID(),
    user: users[5]._id,
    facultyID: '123456',
},{
    _id: new ObjectID(),
    user: users[6]._id,
    facultyID: '126964',
},{
    _id: new ObjectID(),
    user: users[7]._id,
    facultyID: '126965',
}];


const subjects = [{
   _id: new ObjectID(),
   faculty: faculties[0]._id,
   name: 'Data Structures',
   code: 'DS'
},{
    _id: new ObjectID(),
    faculty: faculties[0]._id,
    name: 'Operating Systems',
    code: 'OS'
},{
    _id: new ObjectID(),
    faculty: faculties[0]._id,
    name: 'Compiler Design',
    code: 'CD'
},{
    _id: new ObjectID(),
    faculty: faculties[1]._id,
    name: 'Thermodynamics',
    code: 'TD'
},{
    _id: new ObjectID(),
    faculty: faculties[2]._id,
    name: 'Businesss Communication',
    code: 'BC'
},{
    _id: new ObjectID(),
    faculty: faculties[2]._id,
    name: 'Engineering Economics',
    code: 'EEC'
}];


const enrolls = [{
    _id: new ObjectID(),
    student: students[0]._id,
    subject: subjects[0]._id,
},{
    _id: new ObjectID(),
    student: students[0]._id,
    subject: subjects[1]._id,
},{
    _id: new ObjectID(),
    student: students[0]._id,
    subject: subjects[2]._id,
},{
    _id: new ObjectID(),
    student: students[1]._id,
    subject: subjects[0]._id,
},{
    _id: new ObjectID(),
    student: students[1]._id,
    subject: subjects[1]._id,
},{
    _id: new ObjectID(),
    student: students[1]._id,
    subject: subjects[5]._id,
},{
    _id: new ObjectID(),
    student: students[2]._id,
    subject: subjects[3]._id,
},{
    _id: new ObjectID(),
    student: students[2]._id,
    subject: subjects[0]._id,
},{
    _id: new ObjectID(),
    student: students[2]._id,
    subject: subjects[4]._id,
},{
    _id: new ObjectID(),
    student: students[3]._id,
    subject: subjects[0]._id,
},{
    _id: new ObjectID(),
    student: students[3]._id,
    subject: subjects[4]._id,
},{
    _id: new ObjectID(),
    student: students[3]._id,
    subject: subjects[5]._id,
},{
    _id: new ObjectID(),
    student: students[4]._id,
    subject: subjects[0]._id,
},{
    _id: new ObjectID(),
    student: students[4]._id,
    subject: subjects[1]._id,
},{
    _id: new ObjectID(),
    student: students[4]._id,
    subject: subjects[4]._id,
}];



const assignments = [{
    _id: new ObjectID(),
    subject: subjects[0]._id,
    name: 'Module 1',
    date: new Date()
}];

const studentAssignments = [{
    _id: new ObjectID(),
    student: students[0]._id,
    assignment: assignments[0]._id,
    submitted: true
},{
    _id: new ObjectID(),
    student: students[1]._id,
    assignment: assignments[0]._id,
    submitted: true
},{
    _id: new ObjectID(),
    student: students[2]._id,
    assignment: assignments[0]._id,
    submitted: true
},{
    _id: new ObjectID(),
    student: students[3]._id,
    assignment: assignments[0]._id,
    submitted: false

},{
    _id: new ObjectID(),
    student: students[4]._id,
    assignment: assignments[0]._id,
    submitted: false
}];





const populate = async () => {
    try {
        const user = new User(users[0]);
        await user.save();
        // await Student.insertMany(students);
        // await Faculty.insertMany(faculties);
        // await Subject.insertMany(subject);
        // await Enroll.insertMany(enrolls);
        // await StudentAssignment.insertMany(studentAssignments);
    } catch(e) {
        console.log(e);
    }
};


populate();