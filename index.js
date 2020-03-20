const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./config/keys')

const app = express();

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
},
    accessToken => {
    console.log(accessToken);
    }

    )
);

//Client ID 16206904846-tb671h4s46738eth6csfecvfnhctirha.apps.googleusercontent.com
//Client Secret JvzeB-n579u8sh5qyPH0VSi6

const PORT = process.env.PORT || 5000 ;
app.listen(PORT);