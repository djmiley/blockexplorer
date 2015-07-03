'use strict';

angular.module('myApp.master', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/master', {
    templateUrl: 'master/master.html',
    controller: 'MasterCtrl'
  });
}])

.controller('MasterCtrl', ['$scope', '$http', function($scope, $http) {
	
	function getNextBlock(result) {
		$scope.lastTenBlocks.push(result.data);
		$scope.latestBlock = result.data;
  
		return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block);	
	}
	
	function getFirstBlock() {
		return $http.get("http://localhost:8080/blockchain/latestblock")
			.then(function (result) {
				$scope.latestBlock = result.data;
		  
				return $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.hash);
			});
	}
	
	$scope.lastTenBlocks = [];
	
	$scope.latestBlock = [];
		
	getFirstBlock()
		.then(getNextBlock)
		.then(getNextBlock)
		.then(getNextBlock)
		.then(getNextBlock)
		.then(getNextBlock)
		.then(getNextBlock)
		.then(getNextBlock)
		.then(getNextBlock)
		.then(getNextBlock)
		.then(getNextBlock);	
	
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