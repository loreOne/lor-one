(function() {
  'use strict';
  angular.module('app.map', []);

  angular.module('app.map')
  .controller('mapController', mapController);
  mapController.$inject = ['socket'];
  function mapController (socket) {
    var vm = this;

    vm.closeClick = closeClick;
    vm.onClick = onClick;
    var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Mensaje</h1>'+
    '<div id="bodyContent">'+
    '<p>Te estamos observando nene</p>'+
    '</div>'+
    '</div>';
    vm.map = {
      center:{
        latitude:24.810188,
        longitude:-107.435806
      },
      zoom:16
    };
    vm.dataSensors={
      temperatura:'-',
      humedad:'-',
      luminosidad:'-'
    };
    vm.markers=[];
    vm.markers[0] =  {
      id:1,
      coords:{
        latitude:24.810188,
        longitude:-107.435806
      },

      showWindow:true,
      options:{
        draggable:true,
        icon:"/img/pin.png",
        "labelContent":"Mod 1",
        "labelAnchor":"22 0",
        "labelClass":"marker-labels"
      },
      show:true,
      window:{
        title: 'Mod 1',
        options:{
          visible: false,
          templateParameter:contentString
        }
      }
    }

    function onClick (marker) {
      marker.window.options.visible = !marker.window.options.visible;
    };

    function closeClick (marker) {
      marker.window.options.visible = false;
    }
    setTimeout(function () {
      socket.on('temperatura', function (result) {
        vm.dataSensors.temperatura = result+' C';
      });
      socket.on('humedad', function (result) {
        vm.dataSensors.humedad = result+' %';
      });
      socket.on('luminosidad', function (result) {
        vm.dataSensors.luminosidad = result+' Cd';
      });
    }, 500);
/*
    for(var i=1 ; i< 20 ; i++){
      setTimeout(function () {
        vm.markers[1].coords.latitude = vm.markers[1].coords.latitude+(i*0.00001);
        vm.markers[1].coords.longitude = vm.markers[1].coords.longitude+(i*0.00001);
      }, 5000);
    }
*/
  };
}());
