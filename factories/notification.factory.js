
const lengthOfSummary = 30
const notificationType = {
  ANSWER: 'An answer was posted to your translation request',
  COMMENT: 'A comment was posted to a translation you follow',
  ACCEPTED: 'Your answer was accepted',
  REJECTED: 'Your answer was rejected',
  COMMENT: 'A comment was made on your tranlation request',
  TRANSLATION: 'Someone posted on a translation you are following'
}

const constructNotification = (type, message, docOwner) => {
  const summary = message ? message.substring(0, lengthOfSummary) : ''
  return {
    type,
    title: notificationType[type],
    summary,
    docOwnerId: docOwner,
    translation: docOwner,
    opened: null,
    message,
    createdOn: new Date()
  }
}




exports.notificationType = notificationType
exports.constructNotification = constructNotification

