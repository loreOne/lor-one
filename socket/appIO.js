
/* jshint -W030 */
const verboseServer = true;
const serialport = require('serialport');
const fs = require('fs');

serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log('***********************************');
    console.log('comName      : ', port.comName);
    console.log('pnpId        : ', port.pnpId);
    console.log('manufacturer : ', port.manufacturer);
  });
});
const math = require('mathjs');

const mysql = require('mysql');
// var connection = mysql.createConnection({
//   host: '172.172.172.25',
//   user: 'root',
//   password: 'root',
//   database: 'estacion',
//   // port: 3306
//   insecureAuth: true
// });
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
  var stringParse = function(recvString){
    var items = recvString.split(',');
    return {
      id:  items[0],
      temp1: items[1],
      hum: items[2],
      pres: items[3],
      temp2: items[4],
      mx: items[5],
      my: items[6],
      mz: items[7],
      ax: items[8],
      ay: items[9],
      az: items[10],
      gx: items[11],
      gy: items[12],
      gz: items[13],
      lat: items[14],
      lon: items[15]
    }
  }

  var port = {};
  var port = new serialport('/dev/cu.usbmodem1421', {
    //var port = new serialport('COM20', {
    baudrate: 9600,
    parser: serialport.parsers.readline('\n')
  });


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

      connection.query(`SELECT * FROM dato where id='est1' and variable = '${target}' order by fecha desc limit 1`, function (error, result, fields) {
        if(error){
          throw error;
        }
        else{
          for (var i = 0; i < result.length; i++) {
            // console.log('results[i]', result[i])
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

    port.on('data', function(line) {
      var today = new Date();
      var gprmcObj = stringParse(line);
      var pos = {
        lat: gprmcObj.lat,
        lng: gprmcObj.lon
      };

      var sen = {
        temp: gprmcObj.temp1,
        hume: gprmcObj.hum,
        press: gprmcObj.pres,
        temp2: gprmcObj.temp2,
      };

      /* Hyposometric formula:                      */
      /*                                           */
      /*     ((P0/P)^(1/5.257) - 1) * (T + 273.15)  */
      /* h = -------------------------------------  */
      /*                   0.0065                   */
      /*                                            */
      /* where: h   = height (in meters)            */
      /*        P0  = sea-level pressure (in hPa)   */
      /*        P   = atmospheric pressure (in hPa) */
      /*        T   = temperature (in °C)           */

      var seaLevel = 1013.25;
      // console.log(((math.pow((seaLevel / sen.press), 0.190223) - 1.0) * (parseFloat(sen.temp2) + 273.15)) / 0.0065);

      // console.log(gprmcObj);
      console.log('pos', pos);
      if (pos.lat) {
        console.log('Enviar', pos);
        socket.emit('coords:gps', {
          latlng: pos
        }); //emit
      }
      else {
        var pos = {
          lat: 24.810188,
          lng: -107.435806
        };
        socket.emit('coords:gps', pos); //emit

      }

      socket.emit('datos:sensors', {
        sensores: sen
      }); //emit

      fs.open('info.txt', 'wx', (err, fd) => {
        if (err) {
          if (err.code === "EEXIST") {
            fs.appendFile('info.txt', '\n' + today + line, (err) => {
              if (err) throw err;
              console.log('String agregada');
            });
            return;
          } else {
            throw err;
          }
        }
        // fs.writeFile('info.txt', today + line, (err) => {
        //   if (err) throw err;
        //   console.log('String guardado');
        // }); //write file
      });
    }); //port on


    socket.emit('coords:gps', {
      lat: 24.810188,
      lng: -107.435806
    }); //emit

  });
};
