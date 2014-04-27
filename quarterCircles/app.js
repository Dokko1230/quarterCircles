
// var div = document.createElement("div");
// div.innerHTML = "Hello, world!";
// document.body.appendChild(div);

// var body = d3.select("body");
// var div = body.append("div");
// div.html("Hello,!");

// var section = d3.selectAll("section");
// var div = section.append("div");
// div.html("Hello, world!");

var height = window.innerHeight;
var width = window.innerWidth;
var radius = 75;
var colors = ["rgb(26, 188, 156)", "rgb(46, 204, 113)", "rgb(52, 152, 219)", "rgb(155, 89, 182)", "rgb(52, 73, 94)", "rgb(22, 160, 133)", "rgb(39, 174, 96)", "rgb(41, 128, 185)", "rgb(142, 68, 173)", "rgb(44, 62, 80)", "rgb(241, 196, 15)", "rgb(230, 126, 34)", "rgb(231, 76, 60)", "rgb(236, 240, 241)", "rgb(149, 165, 166)", "rgb(243, 156, 18)", "rgb(211, 84, 0)", "rgb(192, 57, 43)", "rgb(189, 195, 199)", "rgb(127, 140, 141)"];

var circlePath = function(x, y, r) {

  var rand = Math.ceil(Math.random() * 4);
  if(rand === 1) {
    return "M" + (x) + " " + (y + r) +
           " A " + r + " " + r + " 0 0 1 " + (x + r) + " " + (y) +
           " L " + (x + r) + " " + (y + r) + " Z";
  } else if(rand === 2) {
    return "M" + (x) + " " + (y) +
           " A " + r + " " + r + " 0 0 1 " + (x + r) + " " + (y + r) +
           " L " + (x) + " " + (y + r) + " Z";
  } else if(rand === 3) {
    return "M" + (x + r) + " " + (y) +
           " A " + r + " " + r + " 0 0 1 " + (x) + " " + (y + r) +
           " L " + (x) + " " + (y) + " Z";
  } else if(rand === 4) {
    return "M" + (x) + " " + (y) +
           " A " + r + " " + r + " 0 0 0 " + (x + r) + " " + (y + r) +
           " L " + (x + r) + " " + (y) + " Z";
  }
};
var svg = d3.select('body').append('svg').append('g');

var dataSet = [];

for(var i = 0; i < height / radius; i++) {
  for(var j = 0; j < width / radius; j++) {
    dataSet.push(circlePath(j * radius, i * radius, radius));
  }
}

var quarters = svg.selectAll('path.quarters')
                 .data(dataSet, function(d, i) { return i; })
                 .enter().append('path')
                 .transition()
                 .duration(500)
                 .delay(function() { return Math.random() * 1500; })
                 .ease('cubic')
                 .attr('fill', function() { return colors[Math.ceil(Math.random() * colors.length)]; })
                 .attr('d', function(d) { return d; });

var update = function(array) {
  // console.log(array);
  // var quarters = svg.selectAll('path.quarters').remove();
  d3.selectAll('path').transition()
                      .delay(function() { return Math.random() * 1000; })
                      .duration(1000)
                      .attr('opacity', '0')
                      .remove();

  var quarters = svg.selectAll('path.quarters')
                 .data(dataSet, function(d, i) { return i; })
                 .enter().append('path')
                 .transition()
                 .duration(500)
                 .delay(function() { return Math.random() * 1500; })
                 .ease('cubic')
                 .attr('fill', function() { return colors[Math.ceil(Math.random() * colors.length)]; })
                 .attr('d', function(d) { return d; });

};

var shuffle = function(array) {
  // var m = array.length, t, i;
  // while (m) {
  //   i = Math.floor(Math.random() * m--);
  //   t = array[m], array[m] = array[i], array[i] = t;
  // }
  // return array;

  for(var i = 0; i < array[i]; i++) {
      array[i] = circlePath(j * radius, i * radius, radius);
  }
  return array;
};

document.body.onclick = function() {
  update(shuffle(dataSet));
};
