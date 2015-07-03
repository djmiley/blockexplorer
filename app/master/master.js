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
		$scope.blocks.push(result.data);
  
		return $http.get("http://localhost:8080/blockchain/rawblock/" + result.data.prev_block);	
	}
	
	function getFirstPage() {
		$http.get("http://localhost:8080/blockchain/latestblock")
        .success(function (data, status, headers, config) {
	        var initialBlockHash = data.hash;
			
			getPageBlocks(initialBlockHash, 10);
			
            return data;
        }).error(function (data, status, headers, config) {
            alert("error");
            return status;
        });
	}
	
	function getPageFirstBlock(initialBlockHash) {
		return $http.get("http://localhost:8080/blockchain/rawblock/" + initialBlockHash)
		    .then(function (result) {
		        $scope.blocks.push(result.data);
		  
		        return $http.get("http://localhost:8080/blockchain/rawblock/" + result.data.prev_block);
		    });
	}
	
	function getPageBlocks(initialBlockHash, numberOfHashes) {
		getPageFirstBlock(initialBlockHash)
		    .then(function(result) {
				numberOfHashes--;
			    getBlocks(result, numberOfHashes);
			});
	}
	
	function getBlocks(promise, numberOfHashes) {
		if (numberOfHashes > 0) {
			numberOfHashes--;
			getNextBlock(promise)
			    .then(function(result) {
			        getBlocks(result, numberOfHashes);
			    });
		} else {
			return;
		}
	}
	
	$scope.blocks = [];
	
	getFirstPage();
	
	$scope.previous = function() {
		var initialBlockHash  = $scope.blocks[$scope.blocks.length - 1].prev_block;
		
		$scope.blocks = [];
		
		getPageBlocks(initialBlockHash, 10);
		
    }
	
	$scope.searchFilter = function (obj) {
		var re = new RegExp($scope.searchText, 'i');
		return !$scope.searchText || re.test(obj.height.toString()) || re.test(obj.hash.toString()) || re.test(obj.block_index.toString());
	};
	
}]);