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
	  
	  var transactionTree = [];
	 	  
	  for (var i = 0; i < $scope.block.tx.length; i++) {
		  var currentTx = $scope.block.tx[i];
		  
		  var transaction = {
			  'sortid' : i,
			  'hash' : currentTx.hash,
			  'shortHash' : currentTx.hash.substr(0,6) + "...",
			  'time' : currentTx.time,
			  'index' : currentTx.tx_index,
			  'size' : currentTx.size
		  }
		  
		 var hiddenChildren = [];
		  
		  for (var j = 0; j < currentTx.inputs.length; j++) {
			  var currentInput = currentTx.inputs[j];
			  
			  if (currentInput.prev_out) {
				  var child = {
					  'name': curremtInput.prev_out.tx_index,
					  'parent' : currentTx.tx_index
				  }
				  hiddenChildren.push(child);				  
			  }
		  }
		  
		  var transactionStem = {
			  'name' : currentTx.tx_index,
			  'parent' : "",
			  'hiddenChildren' : hiddenChildren
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