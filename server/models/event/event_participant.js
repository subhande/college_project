const mongoose = require('mongoose');

let eventParticipantSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event'
    },
    participant: {
        type: mongoose.Schema.ObjectId,
        ref: 'Participant'
    }

});


let EventParticipant = mongoose.model('EventParticipant',eventParticipantSchema);

module.exports = {EventParticipant};