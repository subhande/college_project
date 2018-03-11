



module.exports = {

    userAuthenticated: function(req, res, next){

        if(req.isAuthenticated() && req.user.role.hasOwnProperty('isStudent')){
            return next();
        }

        res.redirect('/login');

    },
    eventUserAuthenticated: function(req, res, next){

        if(req.isAuthenticated() && (req.user.role === 'admin' || req.user.role === 'participant')){
            return next();
        }

        res.redirect('/event/login');

    }



};