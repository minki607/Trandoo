const requireLogin = require('../middlewares/requireLogin')
const mongoose = require('mongoose')
const Comments = mongoose.model('Comment')
const Answer = mongoose.model('Answer')
const { io } = require('../socket')

module.exports = app => {
  app.get('/api/comments', requireLogin, async (req, res) => {
    const { answerId } = req
    try {
      const comments =
        (await Comments.find({ answer: answerId })) || []
      res.send(comments)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  app.post('/api/comments', requireLogin, async (req, res) => {
    const { comment, answerId } = req.body
    try {
      const commentObject = new Comments({
        comment,
        createdOn: new Date(),
        answer: answerId
      })

      commentObject._user = req.user
      await commentObject.save()
      await Answer.findByIdAndUpdate(answerId, { $push: { comments: commentObject._id } })
      res.send('successfully posted comment')
    } catch (err) {
      res.status(500).send(err)
    }
  })
  app.patch('/api/comments/update', requireLogin, async (req, res) => {
    const { comment, commentId } = req.body
    try {
      const commentObject = await Comments.findById(commentId)
      await Comments.findByIdAndUpdate(commentId, { comment })
      const { answer } = commentObject
      const answerObject = await Answer.findById(answer)
      io().emit('commentUpdate', { userId: answerObject._user, translationId: answerObject.translation })
      res.send('Successfully updated comment')
    } catch (err) {
      res.status(500).send(err)
    }
  })
  app.delete('/api/comments/delete/:commentId', requireLogin, async (req, res) => {
    const { commentId } = req.params
    try {
      const commentObject = await Comments.findById(commentId)
      const { answer } = commentObject
      const answerObject = await Answer.findById(answer)
      await Comments.findByIdAndDelete(commentId)
      io().emit('commentUpdate', { userId: answerObject._user, translationId: answerObject.translation })
      res.send('Successfully deleted comment')

    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  })

}