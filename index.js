const express = require('express');
var app = express();
var server = require('http').Server(app);

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  var origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'token,Content-Type');

  // Pass to next layer of middleware
  next();
});
app.set('view engine', 'jade');
app.use(express.static('bower_components'));
app.use(express.static('client/public'));

app.use(require('./config/router')(server));

var port = process.env.PORT || 4000;
server.listen(port, function() {
  var environment =  ( process.env.NODE_ENV || 'develop' );

  console.log('Servidor '+ environment + ' corriendo en http://localhost:'+port);
});

module.exports = app; // for testing

// var server = app.listen(port, function(){
//   console.log('App stared on port http://localhost:' + port);
// });
