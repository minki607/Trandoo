const passport = require('passport')


module.exports = (app) => {
    app.get('/auth/google',
        passport.authenticate('google', { scope: ['openid', 'email'] }),
        function(req, res){
            // The request will be redirected to Google for authentication, so this
            // function will not be called.
        });

    app.get('/auth/google/callback', passport.authenticate('google'))
}
