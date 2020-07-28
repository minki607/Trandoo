const mongoose = require('mongoose')
const { notificationType } = require('../factories/notification.factory')
const { Schema } = mongoose
const { io } = require('../socket')

const notificationSchema = new Schema({
    type: String,
    title: String,
    summary: String,
    docOwnerId: { type: Schema.Types.ObjectId },
    translation: { type: Schema.Types.ObjectId, ref: 'transRequest' },
    _user: { type: Schema.Types.ObjectId, ref: 'users' },
    opened: { type: Schema.Types.Date, default: null },
    message: String,
    createdOn: Date
})

notificationSchema.post('save', doc => {
    const { _user, docOwnerId } = doc
    switch (doc.type) {
        case notificationType.ANSWER:
            io().emit('answerPosted', { userId: _user, translation: docOwnerId })
            return
        case notificationType.COMMENT:
            io().emit('commentPosted', { userId: _user, translation: docOwnerId })
            return
        case notificationType.ACCEPTED:
        case notificationType.REJECTED:
            io().emit('answerAccepted', { userId: _user, translation: docOwnerId })
        default:
            return
    }
})

mongoose.model('Notification', notificationSchema)
