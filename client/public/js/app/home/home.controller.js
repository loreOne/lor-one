(function() {
  'use strict';
  angular.module('app.home', []);

  angular.module('app.home')
  .controller('homeController', homeController);

  homeController.$inject = ['socket']

  function homeController (socket) {
    socket.emit('hello', {}, function (result) {
      // alert(result);
    });
    var vm = this;

    vm.myChartObject = {};
    vm.myChartObject.type = "Gauge";

    vm.myChartObject.options = {
      width: 400,
      height: 120,
      redFrom: 90,
      redTo: 100,
      yellowFrom: 75,
      yellowTo: 90,
      minorTicks: 5
    };

    vm.myChartObject.data = [
      ['Label', 'Value'],
      ['Memory', 80],
      ['CPU', 55],
      ['Network', 68]
    ];

  }

}());
