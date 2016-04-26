var $ = require('jquery');
var nav = require('./nav.js');

function setup() {
  // Setup navigation menu
  nav.displayNavigation();

  // Add window for map
  var map = $('<div id="map" class="map"></div>')
  $('body').append(map);

  // Add layers of map
  map.append('<div id="usMapLayer" class="usMapLayer"></div>');
  map.append('<div id="wellPointsLayer" class="wellPointsLayer"></div>');


  // Add details sidebar
  var details = ('<div id="details" class="details"></div>');
  $('body').append(details);

  var detailsCover = ('<div class="detailsCover"></div>');
  $('body').append(detailsCover);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

exports.setup = setup;
exports.numberWithCommas = numberWithCommas;
