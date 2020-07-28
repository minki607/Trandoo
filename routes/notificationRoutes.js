const requireLogin = require('../middlewares/requireLogin')
const mongoose = require('mongoose')
const Notifications = mongoose.model('Notification')
const { io } = require('../socket')

module.exports = app => {
  app.get('/api/notifications', requireLogin, async (req, res) => {
    const { user } = req
    const { _id } = user
    try {
      const notifications = await Notifications.find({ _user: _id }) || []
      res.send(notifications)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  app.patch('/api/notifications', requireLogin, async (req, res) => {
    const { notificationId, translationId } = req.body
    if (notificationId) {
      try {
        const notification = await Notifications.findByIdAndUpdate(
          { _id: notificationId },
          { opened: new Date() }
        )
        res.send(notification)
      } catch (err) {
        req.status(500).send(err)
      }
    } else if (translationId) {
      try {

        const notifications = await Notifications.updateMany(
          { docOwnerId: translationId, _user: req.user._id },
          { opened: new Date() }
        )
        res.send(notifications)
        io().emit('notificationUpdated', { userId: req.user._id })
      } catch (err) {
        console.log(err)
        res.status(500).send(err)
      }
    }
  })
}
