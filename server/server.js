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


app.post('/users/login', async (req, res) => {
    try {

        const body = _.pick(req.body,['email','password']);
        const user = await User.findByCredentials(body.email,body.password);
        //console.log(user);
        const token = await user.generateAuthToken();
        //console.log(token);
        res.header('x-auth',token).send(user);

    } catch(err){
        res.status(400).send();
    }
});


app.delete('/users/me/delete', authenticate,async (req, res) => {

    try{
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch(e) {
        res.status(400).send();
    }

});




app.listen(PORT, () => {
    console.log(`Started up at port ${PORT}`);
});


module.exports = {app};

