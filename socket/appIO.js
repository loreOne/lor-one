
/* jshint -W030 */
const verboseServer = true;

const mysql = require('mysql');
var connection = mysql.createConnection({
  host: '76.163.252.208',
  user: 'C352466_wpuser',
  password: 'Wpuser2016',
  database: 'C352466_wordpress',
  // port: 3306
  insecureAuth: true
});
connection.connect();


module.exports = function ( server ) {

  var io = require('socket.io').listen(server);

  io.on('connection', function(socket) {
    let memory = 0;
    let cpu = 0;
    let network = 0;
    verboseServer && console.log('socket: ',socket.id);
    io.emit('new client', socket.id);
    verboseServer && console.log('Un cliente se ha conectado');
    // console.log('Socket.io User Info ::', socket.request.user);
    socket.on('hello', onHello);

    setInterval( () => socket.emit('memory', memory>100? memory=0: memory++), 300);
    setInterval( () => socket.emit('cpu', cpu>100? cpu=0: cpu++), 600);
    setInterval( () => socket.emit('network', network>100? network=0: network++), 900);

    setInterval( emitTemperature, 1000);
    setInterval( emitHumedad, 1000);
    setInterval( emitLuminosidad, 1000);

    function emitTemperature() {
      _getData('temperatura', (err, data) => {
        var temp = -1;
        if (!err) {
          if(data) temp = data.valor;
        }
        socket.emit('temperatura', temp);
      });
    }
    function emitHumedad() {
      _getData('humedad', (err, data) => {
        var temp = -1;
        if (!err) {
          if(data) temp = data.valor;
        }
        socket.emit('humedad', temp);
      });
    }
    function emitLuminosidad() {
      _getData('luminosidad', (err, data) => {
        var temp = -1;
        if (!err) {
          if(data) temp = data.valor;
        }
        socket.emit('luminosidad', temp);
      });
    }

    function onHello ( data, response ) {
      _logger('in getProfile');
      response('hello world');
    }

    function _logger(message) {
      console.log(Date.now() + ' - ' + message + ' - '+socket.id);
    };

    function _getData(target, cb) {

      connection.query(`SELECT * FROM dato where variable = '${target}' order by fecha desc limit 1`, function (error, result, fields) {
        if(error){
          throw error;
        }
        else{
          for (var i = 0; i < result.length; i++) {
            console.log('results[i]', result[i])
          }
          if(result.length > 0){
            // console.log('resultado ', result[0]);
            cb(null, result[0]);
          }
          else{
            let msg = 'Registro no encontrado';
            console.log(msg);
            cb(msg);
          }
        }
      });

      // connection.end();
    }

  });
};
