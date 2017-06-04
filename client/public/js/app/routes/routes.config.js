/**=========================================================
* Module: config.js
* App routes and resources configuration
=========================================================*/


(function() {

  'use strict';

  angular
  .module('app.routes')
  .config(routesConfig);

  routesConfig.$inject = ['$routeProvider', '$locationProvider'];


  function routesConfig ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/views/home.html',
      controller: 'homeController',
      controllerAs: 'hc'
    })
    .when('/blank', {
      templateUrl: '/views/blank.html',
      controller: 'blankController'
    })
    .when('/maps', {
      templateUrl: '/views/maps.html',
      controller: 'mapController',
      controllerAs: 'mc'
    });

    // configure html5 to get links working on jsfiddle
    // $locationProvider.html5Mode(true);
  }

})();
