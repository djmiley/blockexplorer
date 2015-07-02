'use strict';

angular.module('myApp.block', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/block', {
    templateUrl: 'block/block.html',
    controller: 'BlockCtrl'
  });
}])

.controller('BlockCtrl', [function() {
	
	$scope.lastTenBlocks = [];
	
	$scope.latestBlock = [];
	
    $http.get("http://localhost:8080/blockchain/latestblock")
    .success(function (data, status, headers, config) {
	  $scope.latestBlock = data;
			
      return data;
    }).error(function (data, status, headers, config) {
      alert("error");
      return status;
    });

}]);