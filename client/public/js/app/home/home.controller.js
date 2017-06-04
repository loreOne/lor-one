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
        redFrom: 35,
        redTo: 60,
        yellowFrom: 25,
        yellowTo: 34,
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
        redFrom: 35,
        redTo: 60,
        yellowFrom: 25,
        yellowTo: 34,
        minorTicks: 5,
        max:60
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
        redFrom: 350,
        redTo: 400,
        yellowFrom: 25,
        yellowTo: 34,
        minorTicks: 5,
        max:460
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
    }, 5000);


  }

}());
