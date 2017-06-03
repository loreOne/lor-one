(function() {
  'use strict';
  angular.module('app')
  .controller('mainController', mainController);

  function mainController() {
    alert('Hola mundo desde el main controller');
  }
}());
