const requireLogin = require('../middlewares/requireLogin')
const mongoose = require('mongoose')
const Answers = mongoose.model('Answer')
const Translate = mongoose.model('transRequest')
const { constructNotification, notificationType } = require('../factories/notification.factory')
const Notification = mongoose.model('Notification')

module.exports = app => {
  app.get('/api/answers', requireLogin, async (req, res) => {
    const { translationId } = req
    try {
      const answers =
        (await Answers.find({ translation: translationId })) || []
      res.send(answers)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  app.post('/api/answers', requireLogin, async (req, res) => {
    const { answer, translationId } = req.body
    try {
      const answerObject = new Answers({
        answer,
        comments: [],
        createdOn: new Date(),
        translation: translationId
      })

      answerObject._user = req.user
      await answerObject.save()
      await Translate.findByIdAndUpdate(translationId, { $push: { answers: answerObject._id } })
      res.send('successfully posted answer')
    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  })

  app.patch('/api/answers/accept', requireLogin, async (req, res) => {
    const { answerId, context } = req.body
    try {

      const { translation, answer, _user: answerUser } = await Answers.findById(answerId)
      const translationObject = await Translate.findById(translation)
      const notificationMessage = context ? notificationType.ACCEPTED : notificationType.REJECTED
      const notification = new Notification(constructNotification(notificationMessage, answer, translation))
      notification._user = answerUser
      await Answers.findByIdAndUpdate(answerId, { accepted: context })
      await notification.save()
      res.send('successfully accepted answer')
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  })
}
