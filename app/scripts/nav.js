var $ = require('jquery'),
  viz = require('./viz.js'),
  blocks = require('./blocks.js'),
  constants = require('./constants.js'),
  queries = require('./queries.js');

var filters = [];

function displayNavigation() {
  var navBar = $('body').append('<div id="navigation" class="navigation"></div>');
  addNavElements();
  $('body').append("<div id='waiting-icon'></div>");
}

function toggleWells() {
  if ($('#well-toggle-check').is(":checked")) {
    $("#wellPointsLayer").css("display", 'block');
  }
  else {
    $("#wellPointsLayer").css("display", 'none');
  }
}

function toggleHeatmap() {
  if ($('#heatmap-toggle-check').is(":checked")) {
    $("#heatmapLayer").css("display", 'block');
  }
  else {
    $("#heatmapLayer").css("display", 'none');
  }
}

function addNavElements() {
  // State filter
  filters.push("state-select");
  $('#navigation').append(blocks.createSelectOption(constants.states, "state-select", "State"));
  $('#state-select').val(Object.keys(constants.states)[1]);

  // Owner filter
  filters.push("owner-select");
  $('#navigation').append(blocks.createSelectOption(constants.owners, "owner-select", "Owner"));

  // Apply button
  $('#navigation').append(blocks.createSmallButton('apply-button', 'Apply', viz.generateMap));

  var visibilityOptions = $('<div class="visibility-options"></div>');
  $('#navigation').append(visibilityOptions)
  // Add show well check box
  visibilityOptions.append(blocks.createCheckBox("well-toggle-check", "Wells", toggleWells));

  // Add show heatmap check box
  visibilityOptions.append(blocks.createCheckBox("heatmap-toggle-check", "Heatmap", toggleHeatmap));
}

function getFilters() {
  // Accumulate all the applied filters
  var appliedFilters = {};
  for (i=0;i<filters.length;i++) {
    appliedFilters[filters[i]] = $('#'+filters[i]).val();
  }
  return appliedFilters;
}

exports.displayNavigation = displayNavigation;
exports.getFilters = getFilters;
