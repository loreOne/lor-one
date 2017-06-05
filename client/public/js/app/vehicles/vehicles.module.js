(function() {
  'use strict';
  angular.module('app.vehicles', []);

  angular.module('app.vehicles')
  .controller('vehiclesController', vehiclesController);
  vehiclesController.$inject = ['socket'];
  function vehiclesController(socket) {
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
        latitude:24.785631044207356,
        longitude:-107.39720630645752
      },
      zoom:14
    };

    vm.markers=[];
    vm.markers[0] =  {
      id:1,
      coords:{
        latitude:24.785631044207356,
        longitude:-107.39720630645752
      },
      showWindow:true,
      options:{
        draggable:true,
        icon:'/img/police-front.png'
      },
      show:true,
      window:{
        title: 'Mod x',
        options:{
          visible: false,
          templateParameter:contentString
        }
      }
    }
    socket.on('coords:gps', function coords(pos) {
      console.log('coords:gps', pos);
      vm.markers[0].coords.latitude = pos.lat;
      vm.markers[0].coords.longitude = pos.lng;
      vm.map.center.latitude = pos.lat;
      vm.map.center.longitude = pos.lng;
    });
    function onClick (marker) {
      marker.window.options.visible = !marker.window.options.visible;
    };

    function closeClick (marker) {
      marker.window.options.visible = false;
    }
  };
}());
