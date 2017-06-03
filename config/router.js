module.exports = function (server) {

  var bodyParser    = require('body-parser');
  var express       = require('express');
  const path = require('path');


  var router = express.Router();

  // User body-parser into API's router for JSON format into XHR requests
  router.use(bodyParser.json());

  require('../socket/appIO')(server);


  router.get('/', function(req, res) {
    // res.send('<h1> Hola Mundo </h1>');
    res.sendFile(path.join(__dirname, '../client/index.html'));
    // res.render('./client/index.html');
  });




  router.use('/*', function( req, res ){
    res.redirect('/');
  });

  return router;

};
