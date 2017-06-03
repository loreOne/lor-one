(function() {
  'use strict';
  angular.module('app', [
    'ngRoute',
    'ui.router',
    'app.routes',
    'app.sockets',
    'app.home',
    'app.blank'
  ]);
}());
