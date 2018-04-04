var width = 500,
    height = 500,
    radius = Math.min(width, height) / 2.1,
    spacing = 0.07

var svg = d3.select('#canvas').append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');

var arc = d3.svg.arc()
  .startAngle(0)
  .endAngle(function (d) { return d.value * 2 * Math.PI; })
  .innerRadius(function(d) { return d.index * radius; })
  .outerRadius(function(d) { return (d.index + spacing) * radius; });

var tracksLayer = svg.append('g').attr('class', 'tracks');
var ringsLayer = svg.append('g').attr('class', 'rings');
var linesLayer = svg.append('g').attr('class', 'lines');

tracksLayer.selectAll('.track')
    .data(fields().map(function (d) { d.value = 1; return d; }))
  .enter().append('path')
    .attr('class', 'track')
    .attr('d', arc);


var clockRing = ringsLayer.selectAll('.clock-ring')
  .data(fields);

clockRing.enter().append('path')
  .attr('class', function (d) { return 'ring clock-ring ' + d.id; });


var clockLine = linesLayer.selectAll('.clock-line')
  .data(fields);

clockLine.enter().append('line')
  .attr('class', function (d) { return 'line clock-line ' + d.id; })
  .attr('x1', 0).attr('y1', 0);

d3.transition().duration(0).each(tick);

function tick() {
  clockRing.data(fields);
  clockLine.data(fields);
  
  clockRing
    .attr('d', arc)
  
  clockLine
    .attr('x2', function (d) { return 2 * d.index * radius * Math.cos(d.value * 2 * Math.PI - Math.PI/2); })
    .attr('y2', function (d) { return 2 * d.index * radius * Math.sin(d.value * 2 * Math.PI - Math.PI/2); });
  
  setTimeout(tick, 42);
}


function fields() {
  var now = new Date();
  var ms = now.getMilliseconds();
  var s = now.getSeconds();
  var m = now.getMinutes();
  var h = now.getHours() % 12;
  
  return [
    {index: .5, id: 'second', value: (s + ms/1000) / 60},
    {index: .4, id: 'minute', value: (m + s/60) / 60 },
    {index: .3, id: 'hour', value: (h + (m + s/60)/60) / 12 }
  ];
}