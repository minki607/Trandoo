const mongoose = require('mongoose');
const { Schema } = mongoose


const userSchema = new Schema({
    name: String,
    displayName: String,
    googleId: String,
    facebookId: String,
    githubId: String,
    credits: { type: Number, default: 0},
    prefLanguage: [{}],
    specialities: [{}]
})

mongoose.model('users', userSchema)