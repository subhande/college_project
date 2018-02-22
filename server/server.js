require('./config/config');

const express = require('express');
const _ = require('lodash');
const bodyParser  = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/users');
const {authenticate} = require('./middleware/authenticate');

const PORT = process.env.PORT;

let app = express();

//middleware

app.use(bodyParser.json());


app.post('/users',async (req, res) => {
    try {
        const body = _.pick(req.body,['email','password']);
        const user = new User(req.body);

        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth',token).send(user);
    } catch(e) {
        res.status(400).send(e);
    }
});


app.get('/users/me', authenticate, async (req, res) => {
    res.send(req.user);
});



app.listen(PORT, () => {
    console.log(`Started up at port ${PORT}`);
});


module.exports = {app};

