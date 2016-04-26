'use strict';

// CSS
require('../styles/nav.scss');
require('../styles/viz.scss');
require('../styles/utilities.scss');
require('../styles/blocks.scss');
require('../styles/genericons/genericons.css');

// JS
var viz = require('./viz.js'),
  utilities = require("./utilities.js"),
  $ = require('jquery'),
  queries = require('./queries.js'),
  constants = require('./constants.js'),
  nav = require('./nav.js');

// Setup screen
utilities.setup();
viz.initializeSVGs();
viz.displayMap(constants.usMap);

// Generate first map
viz.generateMap();
