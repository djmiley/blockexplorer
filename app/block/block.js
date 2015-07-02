'use strict';

angular.module('myApp.block', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/block/:blockHash*', {
    templateUrl: 'block/block.html',
    controller: 'BlockCtrl'
  });
}])

.controller('BlockCtrl', ['$scope', '$http', '$routeParams', '$sce', function($scope, $http, $routeParams, $sce) {
	
	$scope.blockHash = $sce.trustAsResourceUrl($routeParams.blockHash);
	
	$scope.latestBlock = [];
	
    $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.blockHash)
    .success(function (data, status, headers, config) {
	  $scope.latestBlock = data;
			
      return data;
    }).error(function (data, status, headers, config) {
      alert("error");
      return status;
    });

}]);