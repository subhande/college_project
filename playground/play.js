require('../server/config/config');


const {mongoose} = require('../server/db/mongoose');
const {ObjectID} = require('mongodb').ObjectID;
const {User} = require('../server/models/user');
const {Student} = require('../server/models/student');
const {Faculty} = require('../server/models/faculty');
const {Subject} = require('../server/models/subject');
const {Enroll} = require('../server/models/enroll');
const {StudentAssignment} = require('../server/models/student_assignment');
const {Assignment} = require('../server/models/assignment');



let find = async () => {
    try {
        let faculty = await Faculty.findOne({facultyID: 123456}).populate('user');
        let subject = await Subject.findOne({faculty: faculty._id});

        let enroll = await Enroll.find({subject: subject._id});
        enroll.forEach(async (enroll) => {
            let student = await Student.findOne({_id: enroll.student}).populate('user');
            let assignment = await StudentAssignment.findOne({student: student._id}).populate('assignment');
            if(assignment.submitted){
                console.log(`Name: ${student.user.username} submitted the assignment`);
            } else {
                console.log(`Name: ${student.user.username} didn't submitted the assignment`);
            }
        });

    } catch(e){
        console.log(e);
    }
};

find();


