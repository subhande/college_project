const mongoose = require('mongoose');

let studentAssignmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student'
    },
    assignment : {
        type: mongoose.Schema.ObjectId,
        ref: 'Assignment'
    },
    submitted: {
        type: Boolean,
        default: false
    }
});


let StudentAssignment = mongoose.model('StudentAssignment',studentAssignmentSchema);

module.exports = {StudentAssignment};