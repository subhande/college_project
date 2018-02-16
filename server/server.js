require('./config/config');

const express = require('express');
const _ = require('lodash');
const bodyParser  = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/users');

const PORT = process.env.PORT;

let app = express();

//middleware

app.use(bodyParser.json());


app.post('/users',async (req, res) => {
    try {
        let body = _.pick(req.body,['email','password']);
        let user = new User(req.body);

        let doc = await user.save();
        let token = doc.generateAuthToken();
        res.send(doc);
    } catch(e) {
        res.status(400).send(e);
    }
});










app.listen(PORT, () => {
    console.log(`Started up at port ${PORT}`);
});


module.exports = {app};

