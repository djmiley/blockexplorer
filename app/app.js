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
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = 480 - margin.left - margin.right,
          height = 360 - margin.top - margin.bottom;
          
        //Create the d3 element and position it based on margins
        var svg = d3.select(element[0])
          .append("svg")
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
        //Create the scales we need for the graph
        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
        var y = d3.scale.linear().range([height, 0]);
 
        //Create the axes we need for the graph
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
 
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10);
        
        
        //Render graph based on 'data'
        scope.render = function(data) {
		  //Set our scale's domains
		  x.domain(data.map(function(d) { return d.hash; }));
		  y.domain([0, d3.max(data, function(d) { return d.size; })]);
		  
		  //Remove the axes so we can draw updated ones
		  svg.selectAll('g.axis').remove();
		  
		  //Render X axis
		  svg.append("g")
			  .attr("class", "x axis")
			  .attr("transform", "translate(0," + height + ")")
			  .call(xAxis);
			  
		  //Render Y axis
		  svg.append("g")
			  .attr("class", "y axis")
			  .call(yAxis)
			.append("text")
			  .attr("transform", "rotate(-90)")
			  .attr("y", 6)
			  .attr("dy", ".71em")
			  .style("text-anchor", "end")
			  .text("Transaction Size");
		  
		  
		  //Create or update the bar data
		  var bars = svg.selectAll(".bar").data(data);
		  bars.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.hash); })
			.attr("width", x.rangeBand());
		 
		  //Animate bars
		  bars
			  .transition()
			  .duration(1000)
			  .attr('height', function(d) { return height - y(d.size); })
			  .attr("y", function(d) { return y(d.size); })
		};
        
        //Watch 'data' and run scope.render(newVal) whenever it changes
        //Use true for 'objectEquality' property so comparisons are done on equality and not reference
        scope.$watch('data', function(){
          scope.render(scope.data);
        }, true);  
      }
    };
}]);
