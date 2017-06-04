(function() {
  'use strict';
  angular.module('app.vehicles', []);

  angular.module('app.vehicles')
  .controller('vehiclesController', vehiclesController);
  vehiclesController.$inject = [];
  function vehiclesController() {
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
        title: 'Mod 1',
        options:{
          visible: false,
          templateParameter:contentString
        }
      }
    }
    vm.markers[1] =  {
      "id":2,
      coords:{
        latitude:24.78274781559728,
        longitude:-107.39551115036011
      },
      showWindow:true,
      options:{
        draggable:true,
        icon:"/img/police-front.png",
      },
      show:true,
      window:{
        title: 'Mod 2',
        options:{
          visible: false
        }
      }
    }
    function onClick (marker) {
      marker.window.options.visible = !marker.window.options.visible;
    };

    function closeClick (marker) {
      marker.window.options.visible = false;
    }
  };
}());