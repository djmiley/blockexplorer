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
          width = 1280 - margin.left - margin.right,
          height = 5120 - margin.top - margin.bottom;
          
        //Create the d3 element and position it based on margins
        var svg = d3.select(element[0])
          .append("svg")
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
        //Create the scales we need for the graph
        var y = d3.scale.ordinal().rangeRoundBands([0, height], .1);
		// Take away length of small hash characters
        var x = d3.scale.linear().range([0, width - 15.5781]);
 
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
		  y.domain(data.map(function(d) { return d.shortHash; }));
		  x.domain([0, d3.max(data, function(d) { return d.size; })]);
		  
		  // Calculate bar height for use in tooltip calculations
		  var barHeight = Math.floor(height / data.length);
		  
		  //Remove the axes so we can draw updated ones
		  svg.selectAll('g.axis').remove();
		  
		  //Render X axis
		  svg.append("g")
			  .attr("class", "x axis")
			  .attr("transform", "translate(0,0)")
			  .call(xAxis);
			  
		  svg.append("text")
			  .attr("class", "x label")
			  .attr("text-anchor", "middle")
			  .attr("x", width / 2)
			  .attr("y", 20)
			  .text("Transaction Size");
			
			  
		  //Render Y axis
		  var y_axis = svg.append("g")
			  .attr("class", "y axis")
			  .attr("transform", "translate(0,0)")
			  .call(yAxis);
			  
		  y_axis.selectAll(".tick text")
			.data(data)
			.style("text-anchor", "start")
			.attr("x", function(d) { return x(d.size); });
			
			
		  var tip = d3.tip()
			.attr('class', 'd3-tip')
		    .offset(function(d, i) {
				var barPercentage = x(d.size) / width;
				if (barPercentage < 0.5) {
					return [(80 + barHeight) / 2, -x(d.size) / 2 + width / 2 + barPercentage * width / 2];
				} else {
					return [(80 + barHeight) / 2, -x(d.size) / 2 + width - barPercentage * width / 2];
				}
			})
			.style("text-align", "center")
		    .html(function(d) {
		   	    return "Number of Transactions: " + d.size + "<br>Time : " + d.time + "<br>Index : " + d.index + "<br>Hash : " + d.hash;
			})
			
		  svg.call(tip);
		  
		  
		  //Create or update the bar data
		  var bars = svg.selectAll(".bar").data(data);
		  bars.enter()
			.append("rect")
			  .attr("class", "bar")
			  .attr("y", function(d) { return y(d.shortHash); })
			  .attr("height", y.rangeBand())
			  .on('mouseover', tip.show)
			  .on('mouseout', tip.hide);
		 
		  //Animate bars
		  bars.transition()
			  .duration(1000)
			  .attr('width', function(d) { return x(d.size); })
			  .attr("x", function(d) { return 0; })
		};
        
        //Watch 'data' and run scope.render(newVal) whenever it changes
        //Use true for 'objectEquality' property so comparisons are done on equality and not reference
        scope.$watch('data', function(){
          scope.render(scope.data);
        }, true);  
      }
    };
}]);
