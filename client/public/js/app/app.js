(function() {
  'use strict';
  angular.module('app', [
    'uiGmapgoogle-maps',
    'ngRoute',
    'googlechart',

    'app.routes',
    'app.sockets',
    'app.home',
    'app.blank',
    'app.map'
  ]);
}());
