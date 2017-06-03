
/* jshint -W030 */
const verboseServer = true;



module.exports = function ( server ) {

  var io = require('socket.io').listen(server);

  io.on('connection', function(socket) {
    verboseServer && console.log('socket: ',socket.id);
    io.emit('new client', socket.id);
    verboseServer && console.log('Un cliente se ha conectado');
    // console.log('Socket.io User Info ::', socket.request.user);
    socket.on('hello', onHello);

    function onHello ( data, response ) {
      _logger('in getProfile');
      response('hello world');
    }

    function _logger(message) {
      console.log(Date.now() + ' - ' + message + ' - '+socket.id);
    };

  });
};
