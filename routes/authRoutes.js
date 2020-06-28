const passport = require('passport')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const User = mongoose.model('users')

module.exports = app => {


    app.get('/auth/google',
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))

    app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),
        async (req,res) => {      
       
        if (req.user.prefLanguage.length == 0) {
            res.redirect('/setPref');
          } else {
            res.redirect('/translate');
          }
        }
        )

    app.get('/auth/facebook', passport.authenticate('facebook'))    
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), 
        (req,res) => {
            if (req.user.prefLanguage.length == 0) {
                res.redirect('/setPref');
              } else {
                res.redirect('/translate');
              }
        }
    )

    app.get('/auth/github', passport.authenticate('github'  ))
    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
        (req, res) => {
            if (req.user.prefLanguage.length == 0) {
                res.redirect('/setPref');
              } else {
                res.redirect('/translate');
              }
  });

    app.get('/api/logout', (req,res) => {
        req.logout();
        res.redirect('/')
    })
    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })

    app.post('/api/current_user', requireLogin, async (req, res) => {

    try {
        req.user.displayName = req.body.displayName; 
        req.user.prefLanguage = req.body.languages
        req.user.specialities = req.body.specialities;
        //only award credit for the first form fill
        if (!req.user.creditAwarded) {
            req.user.credits +=5;
            req.user.creditAwarded = true;
        }
        const user = await req.user.save();
        res.send(user)
    } catch (err) {
        res.status(422).send(err)
    }
        
    })

}
