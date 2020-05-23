const mongoose = require('mongoose');
const {Schema} = mongoose;

const transSchema = new Schema({
    title: String,
    language: String,
    completeIn: Date,
    body: String,
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    dateSent: Date
})


mongoose.model('translation', transSchema)