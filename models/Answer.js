const mongoose = require('mongoose');
const { Schema } = mongoose;
const Translate = mongoose.model('transRequest')
const { constructNotification, notificationType } = require('../factories/notification.factory')
const Notification = mongoose.model('Notification')

const answerSchema = new Schema({
    translation: { type: Schema.Types.ObjectId, ref: 'Translate' },
    _user: { type: Schema.Types.ObjectId, ref: 'users' },
    answer: String,
    accepted: { type: Schema.Types.Boolean, default: false },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    createdOn: Date
})
answerSchema.post('save', async (doc) => {
    const { translation } = doc
    const translationObject = await Translate.findById(translation)
    const notification = new Notification(constructNotification(notificationType.ANSWER, doc.answer, translation))
    notification._user = translationObject._user
    await notification.save()
})


mongoose.model('Answer', answerSchema)