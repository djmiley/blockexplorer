'use strict';

angular.module('myApp.master', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/master', {
    templateUrl: 'master/master.html',
    controller: 'MasterCtrl'
  });
}])

.controller('MasterCtrl', ['$scope', '$http', function($scope, $http) {
	
  /*require(['request'], function(request) {
	  var url = 'https://blockchain.info/latestblock';
  
	  request({
		url: url,
		json: true
	  },function(error, response, body){
		if (!error && response.statusCode == 200) {
		  $scope.latestBlock = body; 
		  console.log(body);
		} else {
			console.log(response.statusCode)
		}
	  });
  });*/
	
  /*var request = require(['request']);
  
  var url = 'https://blockchain.info/latestblock';
  
  request({
	url: url,
	json: true
  },function(error, response, body){
	if (!error && response.statusCode == 200) {
	  $scope.latestBlock = body; 
	  console.log(body);
    } else {
		console.log(response.statusCode)
	}
  });*/
}]);