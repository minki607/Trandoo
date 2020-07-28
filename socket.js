
let io = null;

exports.io = function () {
  return io;
};

exports.initialize = function (server) {

  io = require('socket.io')(server);
  // io.on ('connection', (socket) =>{
  //   socket.on('ANSWER', ({translationId, translationUserId}) => {
  //     io.emit('answerPosted', { translationId, translationUserId } )
  //   })
  //   socket.on('message', ({ translateId, toUserId }) => {
  //     socket.emit('messagePosted', {toUserId,  translateId} )
  //   })

  // })
  return io
};

