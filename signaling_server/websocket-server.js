var utils = require('./lib/utils');
var twilio = require('twilio')('AC0786416b390cfcae8580cc870bac83da', 'ceec747e900e2b10315d84900e8d18bf')

var initWebsocketServer = function(httpServer) {
  var io = require('socket.io').listen(httpServer);

  io.sockets.on('connection', function(socket) {
    console.log('user connected!');
    socket.on('joinRoom', function(room) {
      console.log('user joined room', room);
      socket.join(room);
    });

    socket.on('offer', function(data) {
      socket.broadcast.emit('offer', data);
    });

    socket.on('answer', function(data) {
      socket.broadcast.emit('answer', data);
    })

    socket.on('candidate', function(data) {
      socket.broadcast.emit('candidate', data);
    })

    socket.on('sdp', function(data) {
      socket.emit('sdp', data);
    })

    socket.on('token', function() {
      twilio.tokens.create({}, function(err, token) {
        socket.emit('token', token)
      })
    })

    socket.on('disconnect', function() {
      console.log('user disconnected!');
    });
  });

  return io;
};

module.exports = initWebsocketServer;
