'use strict';

angular.module('myApp.block', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/block', {
    templateUrl: 'block/block.html',
    controller: 'BlockCtrl'
  });
}])

.controller('BlockCtrl', [function() {

}]);