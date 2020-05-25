const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
var GithubStrategy = require('passport-github2').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')


const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },

        async function(accessToken, refreshToken, profile, done) {
           const existingUser = await User.findOne({googleId: profile.id})

            if (existingUser) { // if user already exists
                done(null, existingUser);

            } else { // no user exist with current profile Id
                const newUser = await new User({googleId:profile.id}).save();
                done(null, newUser);
            }
        }
    ));

    passport.use(
        new FacebookStrategy(
            {
                clientID: keys.facebookClientID,
                clientSecret: keys.facebookClientSecret,
                callbackURL: '/auth/facebook/callback',
                proxy: true
            },
    
            async function(accessToken, refreshToken, profile, done) {
               const existingUser = await User.findOne({facebookId: profile.id})
    
                if (existingUser) { // if user already exists
                    done(null, existingUser);
    
                } else { // no user exist with current profile Id
                    const newUser = await new User({facebookId:profile.id}).save();
                    done(null, newUser);
                }
            }
        ));

        passport.use(new GithubStrategy({
            clientID: keys.githubClientID,
            clientSecret: keys.githubClientSecret,
            callbackURL: '/auth/github/callback',
            proxy: true
          },
          async function(accessToken, refreshToken, profile, done) {
            const existingUser = await User.findOne({githubId: profile.id})
 
             if (existingUser) { // if user already exists
                 done(null, existingUser);
 
             } else { // no user exist with current profile Id
                 const newUser = await new User({githubId:profile.id}).save();
                 done(null, newUser);
             }
         }
          ));

