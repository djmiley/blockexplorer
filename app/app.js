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
		
		
        var x = d3.scale.linear().range([0, width]);
 
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
		  var barPadding = (height - data.length * barHeight) / 2;
		  
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
			
		  var tip = d3.tip()
			.attr('class', 'd3-tip')
		    .offset(function(d, i) {
				if (x(d.size) < width / 2) {
					return [(80 + barHeight) / 2, width / 2];
				} else {
					return [(80 + barHeight) / 2, -x(d.size) + width];
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
			  .attr("x", 0)
			  .attr("y", function(d) { return y(d.shortHash); })
			  .attr("height", y.rangeBand())
			  .attr("width", 0)
			  .on('mouseover', tip.show)
			  .on('mouseout', tip.hide);
		 
		  //Animate bars
		  bars.transition()
			  .duration(1000)
			  .attr('width', function(d) { return x(d.size); });
			

		  var button = d3.select('button');

		  button.html(function() {
			  return "Sorted by Block Ordering";
		  })
		    .on('click', function() {
			  sortBars();
		  });
			  
		  var sortStyle = 0;
		  
		  var ID = 0;
		  var SIZE = 1;
		  var TIME = 2;
		  var INDEX = 3;
		  
		  var sortingTypeText = ["Block Ordering", "Size", "Time", "Index"];
 		  
		  var sortModes = [];
		  sortModes[0] = function(a, b) { return d3.ascending(a.sortid, b.sortid); };
		  sortModes[1] = function(a, b) { return d3.descending(a.size, b.size); };
		  sortModes[2] = function(a, b) { return d3.ascending(a.time, b.time); };
		  sortModes[3] = function(a, b) { return d3.ascending(a.index, b.index); };
		  
		  function setButtonText() {
			  var text = "Sorted by ";
			  
			  text += sortingTypeText[sortStyle];
			  
			  return text;
		  }
		  
		  var sortBars = function() {
			  sortStyle += 1;
			  sortStyle %= 4;
			  
			  button.html(function() {
			      return setButtonText();
		      })
			  
			  svg.selectAll("rect")
			    .sort(sortModes[sortStyle])
				.transition()
				.duration(1000)
				.attr('height', y.rangeBand())
				.attr("y", function(d, i) {
					return i * barHeight + barPadding;
				});
		  }

		};
        
        //Watch 'data' and run scope.render(newVal) whenever it changes
        //Use true for 'objectEquality' property so comparisons are done on equality and not reference
        scope.$watch('data', function(){
			if (scope.data) {
				scope.render(scope.data);
			}
        }, true);  
      }
    };
}])
.directive('transactionTree', [ function() {
	return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function (scope, element) {
        //Set margins, width, and height
        var margin = {top: 40, right: 40, bottom: 40, left: 40},
		width = 1280 - margin.right - margin.left,
		height = 1280 - margin.top - margin.bottom;
		
		var i = 0;

		var tree = d3.layout.tree()
			.size([height, width]);

		var diagonal = d3.svg.diagonal()
			.projection(function(d) { return [d.y, d.x]; });

		var svg = d3.select("body").append("svg")
			.attr("width", width + margin.right + margin.left)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        
        //Render graph based on 'data'
        scope.render = function(data) {

var treeData = [
  {
    "name": "Top Level",
    "parent": "null",
    "children": [
      {
        "name": "Level 2: A",
        "parent": "Top Level",
        "children": [
          {
            "name": "Son of A",
            "parent": "Level 2: A"
          },
          {
            "name": "Daughter of A",
            "parent": "Level 2: A"
          }
        ]
      },
      {
        "name": "Level 2: B",
        "parent": "Top Level"
      }
    ]
  }
];		

		  var root = treeData[0];
		  root.xMem = height / 2;
		  root.yMem = 0;
		  
		  update(root);
		  
		  function update(source) {

		  // Compute the new tree layout.
		  var nodes = tree.nodes(root).reverse(),
			  links = tree.links(nodes);

		  // Normalize for fixed-depth.
		  nodes.forEach(function(d) { d.y = d.depth * 250; });

		  // Update the nodes…
		  var node = svg.selectAll("g.node")
			  .data(nodes, function(d) { return d.id || (d.id = ++i); });

		  // Enter any new nodes at the parent's previous position.
		  var nodeEnter = node.enter().append("g")
			  .attr("class", "node")
			  .attr("transform", function(d) { return "translate(" + source.yMem + "," + source.xMem + ")"; })
			  .on("click", click);

		  nodeEnter.append("circle")
			  .attr("r", 1e-6)
			  .style("fill", function(d) { return d.childrenMem ? "lightsteelblue" : "#fff"; });

		  nodeEnter.append("text")
			  .attr("x", function(d) { return d.children || d.childrenMem ? -16 : 16; })
			  .attr("dy", ".35em")
			  .attr("text-anchor", function(d) { return d.children || d.childrenMem ? "end" : "start"; })
			  .text(function(d) { return d.name; })
			  .style("fill-opacity", 1e-6);

		  // Transition nodes to their new position.
		  var nodeUpdate = node.transition()
			  .duration(750)
			  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

		  nodeUpdate.select("circle")
			  .attr("r", 10)
			  .style("fill", function(d) { return d.childrenMem ? "lightsteelblue" : "#fff"; });

		  nodeUpdate.select("text")
			  .style("fill-opacity", 1);

		  // Transition exiting nodes to the parent's new position.
		  var nodeExit = node.exit().transition()
			  .duration(750)
			  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
			  .remove();

		  nodeExit.select("circle")
			  .attr("r", 1e-6);

		  nodeExit.select("text")
			  .style("fill-opacity", 1e-6);

		  // Update the links…
		  var link = svg.selectAll("path.link")
			  .data(links, function(d) { return d.target.id; });

		  // Enter any new links at the parent's previous position.
		  link.enter().insert("path", "g")
			  .attr("class", "link")
			  .attr("d", function(d) {
				var o = {x: source.xMem, y: source.yMem};
				return diagonal({source: o, target: o});
			  });

		  // Transition links to their new position.
		  link.transition()
			  .duration(750)
			  .attr("d", diagonal);

		  // Transition exiting nodes to the parent's new position.
		  link.exit().transition()
			  .duration(750)
			  .attr("d", function(d) {
				var o = {x: source.x, y: source.y};
				return diagonal({source: o, target: o});
			  })
			  .remove();

		  // Stash the old positions for transition.
		  nodes.forEach(function(d) {
			d.xMem = d.x;
			d.yMem = d.y;
		  });
		}

		// Toggle children on click.
		function click(d) {
		  if (d.children) {
			d.childrenMem = d.children;
			d.children = null;
		  } else {
			d.children = d.childrenMem;
			d.childrenMem = null;
		  }
		  update(d);
		}

		};
        
        //Watch 'data' and run scope.render(newVal) whenever it changes
        //Use true for 'objectEquality' property so comparisons are done on equality and not reference
        scope.$watch('data', function(){
			if (scope.data) {
				scope.render(scope.data);
			}
        }, true);  
      }
    };
}]);

