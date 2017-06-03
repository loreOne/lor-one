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
      controller: 'homeController'
    })
    .when('/blank', {
      templateUrl: '/views/blank.html',
      controller: 'blankController'
    });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
  }























  //
  //
  // routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
  //
  // function routesConfig($stateProvider, $locationProvider, $urlRouterProvider){
  //
  //   // Set the following to true to enable the HTML5 Mode
  //   // You may have to set <base> tag in index and a routing configuration in your server
  //   $locationProvider.html5Mode(false);
  //
  //   // defaults to dashboard
  //   $urlRouterProvider.otherwise('/');
  //
  //   //
  //   // Application Routes
  //   // -----------------------------------
  //   $stateProvider
  //   .state('home', {
  //     url: '/',
  //     controller:'homeController',
  //     controllerAs: 'hc',
  //     templateUrl: '/views/home.html',
  //     resolve: helper.resolveFor('modernizr', 'icons', 'toaster', 'ngDialog','loaders.css', 'spinkit'),
  //   })
  //
  //
  //
  //
  //
  //   // .state('app.calendar_settings', {
  //   // 	url: '/settings/calendar',
  //   // 	title: 'Calendar',
  //   // 	templateUrl: helper.basepath('calendar.settings.html'),
  //   // 	controller: 'CalendarSettingsController',
  //   // 	controllerAs: 'csc',
  //   // 	resolve: helper.resolveFor('moment', 'moment-timezone')
  //   // })
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //   //
  //   // CUSTOM RESOLVES
  //   //   Add your own resolves properties
  //   //   following this object extend
  //   //   method
  //   // -----------------------------------
  //   // .state('app.someroute', {
  //   //   url: '/some_url',
  //   //   templateUrl: 'path_to_template.html',
  //   //   controller: 'someController',
  //   //   resolve: angular.extend(
  //   //     helper.resolveFor(), {
  //   //     // YOUR RESOLVES GO HERE
  //   //     }
  //   //   )
  //   // })
  //   ;
  //
  // } // routesConfig
  //

})();
