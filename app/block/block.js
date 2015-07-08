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
	
	$scope.block = [];
	
    $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.blockHash)
    .success(function (data, status, headers, config) {
	  $scope.block = data;
	  
	  $scope.transactionSizes = [];
	  
	  $scope.transactionFamily = [];

	  var transaction;
	  
	  var transactionTree = [];
	  
	  var transactionStem = [];
	  
	  var hiddenChildren = [];
	  
	  var child = []
	  
	  for (var i = 0; i < $scope.block.tx[i].size; i++) {
		  transaction = {
			  'sortid' : i,
			  'hash' : $scope.block.tx[i].hash,
			  'shortHash' : $scope.block.tx[i].hash.substr(0,6) + "...",
			  'time' : $scope.block.tx[i].time,
			  'index' : $scope.block.tx[i].tx_index,
			  'size' : $scope.block.tx[i].size
		  }
		  
		  hiddenChildren = [];
		  
		  for (var j = 0; j < $scope.block.tx[i].inputs.length; j++) {
			  child = {
				  'name': $scope.block.tx[i].inputs[j].sequence,
				  'parent' : $scope.block.tx[i].tx_index
			  }
			  hiddenChildren.push(child);
		  }
		  
		  for (var k = 0; k < $scope.block.tx[i].out.length; k++) {
			  child = {
				  'name': $scope.block.tx[i].out[k].tx_index,
				  'parent' : $scope.block.tx[i].tx_index
			  }
			  hiddenChildren.push(child);
		  }
		  
		  transactionStem = {
			  'name' : $scope.block.tx[i].tx_index,
			  'parent' : "",
			  'hiddenChildren' : hiddenChildren,
		  }

		  transactionTree.push(transactionStem);
		  
		  $scope.transactionSizes.push(transaction);
	  }
	  
	  $scope.transactionFamily = {
		  "name" : "",
		  "parent" : "null",
		  "hiddenChildren" : transactionTree
	  }
			
      return data;
    }).error(function (data, status, headers, config) {
      alert("error");
      return status;
    });
}]);