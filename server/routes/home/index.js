const express= require('express');
const router = express.Router();
const _ = require('lodash');


const {User} = require('../../models/user');
const {authenticate} = require('./../../middleware/authenticate');



router.get('/', (req,res) => {
    res.render('home/index',{
        text: 'hi'
    });
});


// router.post('/users',async (req, res) => {
//     try {
//         const body = _.pick(req.body,['email','password']);
//
//         const user = new User(body);
//
//         await user.save();
//         const token = await user.generateAuthToken();
//         res.header('x-auth',token).send(user);
//     } catch(e) {
//         res.status(400).send(e);
//     }
// });
//
//
// router.get('/users/me', authenticate, async (req, res) => {
//     res.send(req.user);
// });
//
//
// router.post('/users/login', async (req, res) => {
//     try {
//
//         const body = _.pick(req.body,['email','password']);
//         const user = await User.findByCredentials(body.email,body.password);
//         //console.log(user);
//         const token = await user.generateAuthToken();
//         //console.log(token);
//         res.header('x-auth',token).send(user);
//
//     } catch(err){
//         res.status(400).send();
//     }
// });
//
//
// router.delete('/users/me/token', authenticate,async (req, res) => {
//
//     try{
//         await req.user.removeToken(req.token);
//         res.status(200).send();
//     } catch(e) {
//         res.status(400).send();
//     }
//
// });


module.exports = router;