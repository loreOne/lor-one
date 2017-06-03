(function() {
  'use strict';
  angular.module('app', [
    'ngRoute',
    'ui.router',
    'googlechart',
    'app.routes',
    'app.sockets',
    'app.home',
    'app.blank'
  ]);
}());
