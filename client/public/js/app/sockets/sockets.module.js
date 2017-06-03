(function() {
  'use strict';

  angular
  .module('app.sockets', []);

  angular
  .module('app.sockets')
  .factory('socket', sockets);

  sockets.$inject = ['$rootScope'];

  /* @ngInject */
  function sockets($rootScope) {

    var socket = io.connect('/');
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }
    };
  }
})();
