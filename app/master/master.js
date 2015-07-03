'use strict';

angular.module('myApp.master', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/master', {
    templateUrl: 'master/master.html',
    controller: 'MasterCtrl'
  });
}])

.controller('MasterCtrl', ['$scope', '$http', function($scope, $http) {
	
	function getLatestBlock() {
		return $http.get("http://localhost:8080/blockchain/latestblock")
			.then(function (result) {
				return $http.get("http://localhost:8080/blockchain/rawblock/" + result.data.hash);
			});
	}
	
	function getNextBlock(result) {
		$scope.lastTenBlocks.push(result.data);
  
		return $http.get("http://localhost:8080/blockchain/rawblock/" + result.data.prev_block);	
	}
	
	function getFirstPage() {
		getLatestBlock()
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
	}
	
	function getFirst() {
		$http.get("http://localhost:8080/blockchain/latestblock")
        .success(function (data, status, headers, config) {
	        var initalBlockHash = data.hash;
			
			getPage(initalBlockHash);
			
            return data;
        }).error(function (data, status, headers, config) {
            alert("error");
            return status;
        });
	}
	
	function getPageFirstBlock(initalBlockHash) {
		return $http.get("http://localhost:8080/blockchain/rawblock/" + initalBlockHash)
		    .then(function (result) {
		        $scope.lastTenBlocks.push(result.data);
		  
		        return $http.get("http://localhost:8080/blockchain/rawblock/" + result.data.prev_block);
		    });
	}
	
	function getPage(initialBlockHash) {
		getPageFirstBlock(initialBlockHash)
		    .then(getNextBlock)
		    .then(getNextBlock)
		    .then(getNextBlock)
		    .then(getNextBlock)
		    .then(getNextBlock)
		    .then(getNextBlock)
		    .then(getNextBlock)
		    .then(getNextBlock)
		    .then(getNextBlock);
	}
	
	function getBlocks(firstHash, numberOfHashes) {
		
	}
	
	$scope.lastTenBlocks = [];
	
	//getFirstPage();
	
	getFirst();
	
	$scope.previous = function() {
		var initialBlockHash  = $scope.lastTenBlocks[9].prev_block;
		
		$scope.lastTenBlocks = [];
		
		getPage(initialBlockHash);
		
    }
	
	$scope.searchFilter = function (obj) {
		var re = new RegExp($scope.searchText, 'i');
		return !$scope.searchText || re.test(obj.height.toString()) || re.test(obj.hash.toString()) || re.test(obj.block_index.toString());
	};
	
}]);