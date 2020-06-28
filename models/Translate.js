const mongoose = require('mongoose');
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const transSchema = new Schema({
    title: String,
    language: String,
    completeIn: Date,
    body: String,
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    tags: {type: Object, ref: 'Tags'},
    dateSent: Date
})

transSchema.plugin(mongoosePaginate);
mongoose.model('transRequest', transSchema)  