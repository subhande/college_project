const {User} = require('./../models/users');

let authenticate = async (req, res, next) => {
    try {
        let token = req.header('x-auth');

        let user = await User.findByToken(token);

        if(!user) {
            throw new Error('Didn\'t find token');
        }

        req.user = user;
        req.token = token;
        next();
    } catch(e) {
        res.status(401).send();
    }
};

module.exports = {authenticate};