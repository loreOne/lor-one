(function() {
  'use strict';
  angular.module('app.home', []);

  angular.module('app.home')
  .controller('homeController', homeController);

  homeController.$inject = ['socket']

  function homeController (socket) {
    socket.emit('hello', {}, function (result) {
      alert(result);
    });
  }

}());
