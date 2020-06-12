const mongoose = require('mongoose');
const { Schema } = mongoose


const userSchema = new Schema({
    name: String,
    displayName: String,
    googleId: String,
    facebookId: String,
    githubId: String,
    credits: { type: Number, default: 0},
    creditAwarded: {
        type: Boolean,
        default: false
    }, //field to check whether credits has already been awarded for filling out pref form
    prefLanguage: [{}],
    specialities: [{}]
})

mongoose.model('users', userSchema)