const passport = require('passport')


module.exports = app => {


    app.get('/auth/google',
        passport.authenticate('google', { scope: ['openid', 'email'] }))

    app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),
        (req,res) => {
         res.redirect('/translate')
        }
        )

    app.get('/auth/facebook', passport.authenticate('facebook'))    
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), 
        (req,res) => {
            res.redirect('/translate')
        }
    )

    app.get('/auth/github', passport.authenticate('github'))
    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
        (req, res) => {
    res.redirect('/translate');
  });

    app.get('/api/logout', (req,res) => {
        req.logout();
        res.redirect('/')
    })
    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })

}

