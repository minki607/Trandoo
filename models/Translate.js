const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
const { io } = require('../socket')

const transSchema = new Schema({
  title: String,
  originalLanguage: {},
  targetLanguage: {},
  completeIn: Date,
  body: String,
  _user: { type: Schema.Types.ObjectId, ref: 'users' },
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  tags: { type: Object, ref: 'Tags' },
  dateSent: Date
})

transSchema.post('save', (doc) => {
  io().emit('translationRequest', { translationId: doc._id })
});


transSchema.plugin(mongoosePaginate);
mongoose.model('transRequest', transSchema)  