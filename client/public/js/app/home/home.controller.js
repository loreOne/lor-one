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
    vm.temperaturaChart = {
      type: 'Gauge',
      options : {
        width: 400,
        height: 250,
        redFrom: 45,
        redTo: 60,
        yellowFrom: 35,
        yellowTo: 44,
        minorTicks: 5,
        max:60
      },
      data: [
        ['Label', 'Value'],
        ['Temperatura', 0],
      ]
    }
    vm.humedadChart = {
      type: 'Gauge',
      options : {
        width: 400,
        height: 250,
        redFrom: 0,
        redTo: 15,
        yellowFrom: 16,
        yellowTo: 30,
        minorTicks: 5,
        max:100
      },
      data: [
        ['Label', 'Value'],
        ['Humedad', 0],
      ]
    }
    vm.luminosidadChart = {
      type: 'Gauge',
      options : {
        width: 400,
        height: 250,
        redFrom: 500,
        redTo: 600,
        yellowFrom: 400,
        yellowTo: 500,
        minorTicks: 5,
        max:600
      },
      data: [
        ['Label', 'Value'],
        ['Luminosidad', 0],
      ]
    }

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

    setTimeout(function () {
      socket.on('temperatura', function (result) {
        // console.log('temperatura ', result);
        vm.temperaturaChart.data[1][1] = result;
      });
      socket.on('humedad', function (result) {
        // console.log('humedad ', result);
        vm.humedadChart.data[1][1] = result;
      });
      socket.on('luminosidad', function (result) {
        // console.log('luminosidad ', result);
        vm.luminosidadChart.data[1][1] = result;
      });
    }, 1000);
  }

}());
