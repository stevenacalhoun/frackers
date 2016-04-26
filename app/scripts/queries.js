var constants = require('./constants.js');

var serverUrl = "http://localhost:3000/"
// var serverUrl = "http://stark-reef-34291.herokuapp.com/";

var $ = require('jquery'),
    viz = require("./viz.js");

// Get wells based on filters
function addWellData(filters) {
  $('#waiting-icon').addClass("waiting");
  $.ajax({
    type: "POST",
    url: serverUrl + "well_entry/",
    data: filters,
    dataType: "json",
    success: function(data) {
      viz.displayWells(data);
      viz.displayGeneralDetails(data);
      $('#waiting-icon').removeClass("waiting");
    },
    error: function(data) {
      console.log("Error");
      console.log(data);
      $('#waiting-icon').removeClass("waiting");
    }
  })
}

function addHeatMap(state) {
  $('#waiting-icon').addClass("waiting");
  $.ajax({
    type: "POST",
    url: serverUrl + "pollution_entry/",
    data: {"state":constants.stateCodes[state]},
    dataType: "json",
    success: function(data) {
      viz.displayHeatMap(data);
      viz.zoomHeatMap();
      $('#waiting-icon').removeClass("waiting");
    },
    error: function(data) {
      console.log("Error");
      console.log(data);
      $('#waiting-icon').removeClass("waiting");
    }
  })
}

// Get Ingredients for a well
function addWellDetails(wellDetails) {
  $('#waiting-icon').addClass("waiting");
  $.ajax({
    type: "POST",
    url: serverUrl + "well_ingredient/",
    data: {"well":wellDetails.id},
    dataType: "json",
    success: function(ingredients) {
      viz.displayWellDetails(wellDetails, ingredients)
      $('#waiting-icon').removeClass("waiting");
    },
    error: function(data) {
      console.log("Error");
      console.log(data);
      $('#waiting-icon').removeClass("waiting");
    }
  })
}

exports.addWellDetails = addWellDetails;
exports.addHeatMap = addHeatMap;
exports.addWellData = addWellData;
