'use strict';

angular.module('myApp.master', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/master', {
    templateUrl: 'master/master.html',
    controller: 'MasterCtrl'
  });
}])

.controller('MasterCtrl', ['$scope', '$http', function($scope, $http) {
	
	
	$scope.lastTenBlocks = [];
	
	$scope.latestBlock = [];
	
		$http.get("http://localhost:8080/blockchain/latestblock")
		.then(function (result) {
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.hash);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		});
	
	$scope.previous = function() {
		
		$scope.previousTenBlockHash  = $scope.lastTenBlocks[9].prev_block;
		
		$scope.lastTenBlocks = [];
		
		$http.get("http://localhost:8080/blockchain/rawblock/" + $scope.previousTenBlockHash)
		.then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		}).then(function (result) {
		  $scope.lastTenBlocks.push(result.data);
		  $scope.latestBlock = result.data;
		  
		  return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);
		});
    }
	
	$scope.searchFilter = function (obj) {
		var re = new RegExp($scope.searchText, 'i');
		return !$scope.searchText || re.test(obj.height.toString()) || re.test(obj.hash.toString()) || re.test(obj.block_index.toString());
	};
	
}]);