require('../../server/config/config');


const {mongoose} = require('../../server/db/mongoose');
const {ObjectID} = require('mongodb').ObjectID;
const {Event} = require('../../server/models/event/event');
const {Admin} = require('../../server/models/event/eventuser');
const {Participant} = require('../../server/models/event/participant');
const {EventParticipant} = require('../../server/models/event/event_participant');




const admins = [{
    _id: new ObjectID(),
    name: 'Subh',
    email: 'subh@gmail.com',
    password: 'abc123',
    contact: 6785436785
}];

const events = [{
    _id: new ObjectID(),
    name: 'Coding',
    vanue: 'Auditorium',
    desc: 'Good',
    admin: admins[0]._id
}];

const participants = [{
    _id: new ObjectID(),
    name: 'Skye Jackson',
    email: 'skye007@gmail.com',
    password: 'abc123',
    contact: 6788836785,
    college: 'GITA'
},{
    _id: new ObjectID(),
    name: 'Gigi Hadid',
    email: 'gigi@gmail.com',
    password: 'abc123',
    contact: 67886836785,
    college: 'GITA'
}];


const eve_parti = [{
    _id: new ObjectID(),
    event: events[0]._id,
    participant: participants[0]._id
},{
    _id: new ObjectID(),
    event: events[0]._id,
    participant: participants[1]._id
}];


// const populate = async () => {
//     try {
//         await Event.insertMany(events);
//         await Admin.insertMany(admins);
//         await Participant.insertMany(participants);
//         await EventParticipant.insertMany(eve_parti);
//     } catch(e) {
//         console.log(e);
//     }
// };
//
//
// populate();


let find = async () => {
    try {
        let event = await Event.find({});
        let admin = await Admin.find({_id: event[0].admin});
        console.log(admin);
        let prti = await EventParticipant.find({event: event[0]._id}).populate('participant');
        console.log(prti[0].participant.name);
        console.log(prti[1].participant.name);

    } catch(e){
        console.log(e);
    }
};

find();


