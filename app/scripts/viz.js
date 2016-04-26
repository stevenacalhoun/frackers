var $ = require('jquery'),
  d3 = require('d3'),
  topojson = require('topojson'),
  d3tip = require('d3-tip'),
  blocks = require('./blocks.js'),
  utilities = require('./utilities.js'),
  heatmap = require('heatmapjs'),
  nav = require('./nav.js'),
  queries = require('./queries.js');

var mapProjection;

var mapG;
var wellG;
var heatmapCanvas;

var height;
var width;

var wellPointSize = 3.5;
var scaleFactor = 1.0;
var transX = 0;
var transY = 0;

var currentWellData;

var heatmapObject;
var dummyHeatmapObject;

var heatmapCanvas;
var heatmapCtx;

/******************************************************************************************
General map Functions
******************************************************************************************/
// Generate map and heatmap
function generateMap() {
  var appliedFilters = nav.getFilters();
  queries.addHeatMap(appliedFilters['state-select']);
  currentWellData = queries.addWellData(appliedFilters);
}

// Zoom behaviour
var zoom = d3.behavior.zoom()
  .on("zoom",function() {
    transX = d3.event.translate[0];
    transY = d3.event.translate[1];
    scaleFactor = +d3.event.scale;

    // Zoom map
    mapG.attr("transform","translate("+d3.event.translate.join(",")+")scale("+d3.event.scale+")");

    // Zoom wellpoints
    wellG.attr("transform","translate("+d3.event.translate.join(",")+"), scale("+d3.event.scale+")");
    d3.selectAll('circle').attr("r", wellPointSize/scaleFactor);
    d3.selectAll('circle').style("r", wellPointSize/scaleFactor);

    // Zoom heatmap
    zoomHeatMap();
  });

// Add svgs for each layer
function initializeSVGs() {
  height = $('#map').height();
  width = $('#map').width();

  // Add svg element
  var svg = d3.select("#usMapLayer").append("svg")
    .attr("width", width)
    .attr("height", height+4);

  svg.call(zoom)
  mapG = svg.append("g");

  // Add svg element
  var svg = d3.select("#wellPointsLayer").append("svg")
    .attr("width", width)
    .attr("height", height);

  wellG = svg.append("g");
}

// Display map and well points
function displayMap(mapData) {
  var translateWidth = width - 280;
  var translateHeight = height + 100;

  // Create projection
  mapProjection = d3.geo.albersUsa()
    .scale(1)
    .translate([0,0])

  var path = d3.geo.path()
    .projection(mapProjection);

  // Calculate boundares scale and transformation
  var b = path.bounds(mapData.landData),
      s = .95 / Math.max((b[1][0] - b[0][0]) / translateWidth, (b[1][1] - b[0][1]) / translateHeight),
      t = [(translateWidth - s * (b[1][0] + b[0][0])) / 2, (translateHeight - s * (b[1][1] + b[0][1])) / 2];

  mapProjection.scale(s)
    .translate(t)

  // Add states
  mapG.selectAll("path").data(mapData.landData.geometries)
    .enter().append("path")
      .attr("d", path)
      .attr('class', 'land')

  // Add borders
  mapG.selectAll("path").data(mapData.borderData.features)
    .enter().append("path")
      .attr("class", "state-boundary")
      .attr("d", path);
}

/******************************************************************************************
Well point Functions
******************************************************************************************/
function displayWells(data) {
  // Clear old points
  clearPoints();

  if (data.length != 0) {
    // Tooltip
    var tip = d3tip()
      .attr('class', 'd3-tip')
      .html(function(d) {
        return blocks.createToolTipBox(d.city, d.state, d.owner).html();
      });

    // Add in cricles
    circles = wellG.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr('class', 'circle')
        .attr('r', wellPointSize/scaleFactor)
        .style("r", wellPointSize/scaleFactor)
        .attr('stroke-width', 0)
        .on("click", function(d) {
          $('.circle-selected').attr('class', 'circle');
          d3.select(this).attr('class', 'circle-selected');
          queries.addWellDetails(d);
        })
        .attr("transform", function(d) {
          return "translate(" + mapProjection([d.longitude, d.latitude]) + ")";
        })
        .call(tip)
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);
  }
}

function clearPoints() {
  d3.selectAll('circle').remove();
}

// Show general details about whole dataset
function displayGeneralDetails(detailedData) {
  currentWellData = detailedData;

  // Deselect any selected circles
  d3.selectAll('circle').classed('circle-selected', false);
  d3.selectAll('circle').classed('circle', true);

  var details = $('#details');
  details.html('');
  details.append(blocks.createInfoLine("Total Wells", utilities.numberWithCommas(currentWellData.length)));

  var filters = nav.getFilters();
  var state = filters['state-select'];
  var owner = filters['owner-select'];

  if ((owner == "All" || state == "US") && (detailedData.length != 0)) {
    var rankAttribute = state == "US" ? "state" : "owner";
    details.append(blocks.createInfoOrderedList("Highest Well Counts", createRanking(currentWellData, rankAttribute)));
  }
}

function createRanking(detailedData, rankAttribute) {
  var rankCounts = {};
  var orderedRanks = [];

  for (i=0; i<detailedData.length; i++) {
    if (rankCounts[detailedData[i][rankAttribute]] == undefined) {
      rankCounts[detailedData[i][rankAttribute]] = 0;
    }
    rankCounts[detailedData[i][rankAttribute]]++;
  }

  for (var key in rankCounts) {
    orderedRanks.push({
      "label": key,
      "count": rankCounts[key]
    })
  }

  orderedRanks.sort(function(a,b) { return b.count - a.count });
  var rankList = [];

  for (i=0;i<5;i++) {
    if (i >= orderedRanks.length) {
      break;
    }
    rankList.push(orderedRanks[i].label + ': ' + utilities.numberWithCommas(orderedRanks[i].count));
  }
  return rankList;
}

// Show details for one specific well
function displayWellDetails(wellDetails, ingredients) {
  var details = $('#details');
  details.html('');

  var location = wellDetails.city + ', ' + wellDetails.state;
    if (wellDetails.city == null) {
    location = wellDetails.state;
  }
    else if (wellDetails.state == null) {
    location = wellDetails.city
  }

  details.append(blocks.createInfoLine("Location", location));
  details.append(blocks.createInfoLine("Owner", wellDetails.owner));
  details.append(blocks.createInfoLine("ID", wellDetails.id));
  if (ingredients.length != 0) {
    details.append(blocks.createInfoUnorderedList("Ingredients", ingredients));
  }
  details.append(blocks.createLargeButton('details-back', 'Back', function() {return displayGeneralDetails(currentWellData)}));
}

/******************************************************************************************
Heatmap Functions
******************************************************************************************/
function displayHeatMap(data) {
  clearHeatMap();
  $('#map').append('<div id="heatmapLayer" class="heatmapLayer"></div>');
  $('#map').append('<div id="dummyHeatmapLayer" class="dummyHeatmapLayer"></div>');

  // Create heat map
  heatmapObject = heatmap.create({
    container: $("#heatmapLayer")[0],
    radius: 5,
    blur: 0.5,
    gradient: {
      '0.0': '#CCCCCC',
      '0.5': 'pink',
      '1.0': 'red'
    }
  });

  // Create heat map
  dummyHeatmapObject = heatmap.create({
    container: $("#dummyHeatmapLayer")[0],
    radius: 5,
    blur: 0.5,
    gradient: {
      '0.0': '#CCCCCC',
      '0.5': 'pink',
      '1.0': 'red'
    }
  });


  // Convert data
  minVal = 10000000;
  maxVal = -1;
  var convertedData = [];
  for (i=0;i<data.length;i++) {
    var latLngProjection = mapProjection([data[i].longitude, data[i].latitude]);
    if (latLngProjection != null) {
      if (data[i].value > maxVal) {
        maxVal = data[i].value;
      }
      if (data[i].value < minVal) {
        minVal = data[i].value
      }
      convertedData.push({
        "x": latLngProjection[0],
        "y": latLngProjection[1],
        "value": data[i].value
      })
    }
  }

  // Set Data
  heatmapObject.setData({
    max: maxVal,
    min: minVal,
    data: convertedData
  });
  dummyHeatmapObject.setData({
    max: maxVal,
    min: minVal,
    data: convertedData
  });

  $('#waiting-icon').removeClass("waiting");

  heatmapCtx = $("#heatmapLayer > canvas")[0].getContext('2d');
  heatmapCanvas = $("#dummyHeatmapLayer > canvas");
  dummyHeatmapCtx = heatmapCanvas[0].getContext('2d');
}

function zoomHeatMap() {
  heatmapCtx.save();
  heatmapCtx.translate(transX, transY);
  heatmapCtx.scale(scaleFactor, scaleFactor);
  heatmapCtx.clearRect(0, 0, width, height);
  heatmapCtx.drawImage(heatmapCanvas[0], 0, 0);
  heatmapCtx.restore();
}

function clearHeatMap() {
  $('#heatmapLayer').remove();
  $('#dummyHeatmapLayer').remove();
}

exports.generateMap = generateMap;
exports.displayMap = displayMap;
exports.displayGeneralDetails = displayGeneralDetails;
exports.displayWellDetails = displayWellDetails;
exports.clearPoints = clearPoints;
exports.displayWells = displayWells;
exports.displayHeatMap = displayHeatMap;
exports.initializeSVGs = initializeSVGs;
exports.zoomHeatMap = zoomHeatMap;
