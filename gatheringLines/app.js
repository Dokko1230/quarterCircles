var settings = {
  width: window.innerWidth,
  height: window.innerHeight,
  radius: 5,
  color: 'white'
};

var w = 1280,
    h = 800;

var force = d3.layout.force()
    .gravity(0)
    .charge(0)
    .size([w, h]);

var getRandX = function(angle){
  return settings.radius * Math.cos(angle);
};

var getRandY = function(angle){
  return settings.radius * Math.sin(angle);
};

var getRandAngle = function(){
  return Math.random() * 360;
};

var svg = d3.select('#container').append('svg:svg')
  .attr('class', 'arena')
  .append('g')
  .attr('width', settings.width)
  .attr('height', settings.height);

d3.select('svg').on('mousemove', function(event){
  var coord = d3.mouse(this);
  var node = { x: coord[0], y: coord[1] };
  console.log(node);
  console.log(force.nodes());
  svg.selectAll('circle')
    .data(force.nodes())
    .enter()
    .append('circle')
    .attr('r', settings.radius)
    .attr('fill', settings.color)
    .attr('cx', function(d) { return Math.random() * settings.width; })
    .attr('cy', function() { return Math.random() * settings.height; })
  .transition()
    .duration(500)
    .delay(function() { return Math.random() * 1000; })
    .attr('cx', function() { return Math.random() * 10 + coord[0]; })
    .attr('cy', function() { return Math.random() * 10 + coord[1]; })
  .transition()
    .delay(3000)
    .attr('r', 1e-6)
    .each('end', function() {
      force.nodes().shift();
    })
    .remove();

  force.nodes().push(node);
  force.start();
});
