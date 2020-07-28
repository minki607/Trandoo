import axios from 'axios'

export default async (socket, props) => {
  const { fetchNotification, fetchRequestsAsync, fetchRequestAsync } = props
  const currentUser = await axios.get('/api/current_user')
  const updateNotifications = async userId => {
    const { data } = currentUser
    const { _id } = data
    if (_id === userId) {
      fetchNotification()
    }
  }


  socket.on('answerAccepted', async ({ userId }) => {
    await updateNotifications(userId)
  })
  socket.on('commentPosted', async ({ userId }) => {
    await updateNotifications(userId)
  })
  socket.on('answerPosted', async ({ userId }) => {
    await updateNotifications(userId)
  })
  socket.on('notificationUpdated', async ({ userId }) => {
    await updateNotifications(userId)
  })
  socket.on('translationRequest', () => {
    fetchRequestsAsync()
  })
  socket.on('answerPosted', ({ translation }) => {
    fetchRequestAsync(translation)
  })
  socket.on('commentPosted', ({ translation }) => {
    fetchRequestAsync(translation)
  })
  socket.on('answerAccepted', ({ translation }) => {
    fetchRequestAsync(translation)
  })
  socket.on('commentUpdate', ({ translationId }) => {
    fetchRequestAsync(translationId)
  })
}
