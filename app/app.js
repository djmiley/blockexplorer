'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.block',
  'myApp.master',
  'myApp.version'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/master'});
}])
.directive('transactionBars', [ function() {
	return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function (scope, element) {
        //Set margins, width, and height
        var margin = {top: 40, right: 40, bottom: 40, left: 40},
          width = 2560 - margin.left - margin.right,
          height = 2560 - margin.top - margin.bottom;
          
        //Create the d3 element and position it based on margins
        var svg = d3.select(element[0])
          .append("svg")
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
        //Create the scales we need for the graph
        var y = d3.scale.ordinal().rangeRoundBands([0, width], .1);
        var x = d3.scale.linear().range([0, height]);
 
        //Create the axes we need for the graph
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("top")
			.ticks(10);
 
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
        
        
        //Render graph based on 'data'
        scope.render = function(data) {
		  //Set our scale's domains
		  y.domain(data.map(function(d) { return d.hash; }));
		  x.domain([0, d3.max(data, function(d) { return d.size; })]);
		  
		  //Remove the axes so we can draw updated ones
		  svg.selectAll('g.axis').remove();
		  
		  //Render X axis
		  svg.append("g")
			  .attr("class", "x axis")
			  .attr("transform", "translate(0,0)")
			  .call(xAxis);
			  
		  //Render Y axis
		  svg.append("g")
			  .attr("class", "y axis")
			  .attr("transform", "translate(0,0)")
			  .call(yAxis);
		  
		  
		  //Create or update the bar data
		  var bars = svg.selectAll(".bar").data(data);
		  bars.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("y", function(d) { return y(d.hash); })
			.attr("height", y.rangeBand());
		 
		  //Animate bars
		  bars
			  .transition()
			  .duration(1000)
			  .attr('width', function(d) { return width; })
			  .attr("x", function(d) { return width - x(d.size); })
		};
        
        //Watch 'data' and run scope.render(newVal) whenever it changes
        //Use true for 'objectEquality' property so comparisons are done on equality and not reference
        scope.$watch('data', function(){
          scope.render(scope.data);
        }, true);  
      }
    };
}]);
