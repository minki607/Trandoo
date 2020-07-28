const mongoose = require('mongoose');
const { Schema } = mongoose;
const Answer = mongoose.model('Answer')
const { constructNotification, notificationType } = require('../factories/notification.factory')
const Notification = mongoose.model('Notification')
const { io } = require('../socket')


const commentSchema = new Schema({
  answer: { type: Schema.Types.ObjectId, ref: 'Answer' },
  _user: { type: Schema.Types.ObjectId, ref: 'users' },
  comment: String,
  createdOn: Date
})
commentSchema.post('save', async (doc) => {
  const { answer } = doc
  const answerObject = await Answer.findById(answer)
  const notification = new Notification(constructNotification(notificationType.COMMENT, doc.comment, answerObject.translation))
  notification._user = answerObject._user
  if (doc._user !== answerObject._user) {
    await notification.save()
  }

})
commentSchema.post('update', async (doc) => {
  const { answer } = doc
  const answerObject = await Answer.findById(answer)
  io().emit('commentUpdate', { userId: answerObject._user, translationId: answerObject.translation })
})
commentSchema.post('delete', async (doc) => {
  const { answer } = doc
  const answerObject = await Answer.findById(answer)
  io().emit('commentUpdate', { userId: answerObject._user, translationId: answerObject.translation })
})


mongoose.model('Comment', commentSchema)