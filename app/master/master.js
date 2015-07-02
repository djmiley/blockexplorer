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
    .success(function (data, status, headers, config) {
	  $scope.latestBlock = data;
	  
	  $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.hash)
		.success(function (data, status, headers, config) {
		  $scope.lastTenBlocks.push(data);
		  $scope.latestBlock = data;
		  
		  $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block)
			.success(function (data, status, headers, config) {
			  $scope.lastTenBlocks.push(data);
			  $scope.latestBlock = data;
			  
			  $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block)
				.success(function (data, status, headers, config) {
				  $scope.lastTenBlocks.push(data);
				  $scope.latestBlock = data;
				  
				  $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block)
					.success(function (data, status, headers, config) {
					  $scope.lastTenBlocks.push(data);
					  $scope.latestBlock = data;
					  
					  $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block)
						.success(function (data, status, headers, config) {
						  $scope.lastTenBlocks.push(data);
						  $scope.latestBlock = data;
						  
						  $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block)
							.success(function (data, status, headers, config) {
							  $scope.lastTenBlocks.push(data);
							  $scope.latestBlock = data;
							  
							  $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block)
								.success(function (data, status, headers, config) {
								  $scope.lastTenBlocks.push(data);
								  $scope.latestBlock = data;
								  
								  $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block)
									.success(function (data, status, headers, config) {
									  $scope.lastTenBlocks.push(data);
									  $scope.latestBlock = data;
									  
									  $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block)
										.success(function (data, status, headers, config) {
										  $scope.lastTenBlocks.push(data);
										  $scope.latestBlock = data;
										  
										  $http.get("http://localhost:8080/blockchain/rawblock/" + $scope.latestBlock.prev_block)
											.success(function (data, status, headers, config) {
											  $scope.lastTenBlocks.push(data);
											  $scope.latestBlock = data;
											  return data;
											}).error(function (data, status, headers, config) {
											  alert("error");
											  return status;
											});
										  
										  return data;
										}).error(function (data, status, headers, config) {
										  alert("error");
										  return status;
										});
									  
									  return data;
									}).error(function (data, status, headers, config) {
									  alert("error");
									  return status;
									});
								  
								  return data;
								}).error(function (data, status, headers, config) {
								  alert("error");
								  return status;
								});
							  
							  return data;
							}).error(function (data, status, headers, config) {
							  alert("error");
							  return status;
							});
						  
						  return data;
						}).error(function (data, status, headers, config) {
						  alert("error");
						  return status;
						});
					  
					  return data;
					}).error(function (data, status, headers, config) {
					  alert("error");
					  return status;
					});
				  
				  return data;
				}).error(function (data, status, headers, config) {
				  alert("error");
				  return status;
				});
			  
			  return data;
			}).error(function (data, status, headers, config) {
			  alert("error");
			  return status;
			});
		  
		  return data;
		}).error(function (data, status, headers, config) {
		  alert("error");
		  return status;
		});
			
      return data;
    }).error(function (data, status, headers, config) {
      alert("error");
      return status;
    });
}]);