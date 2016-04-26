var $ = require('jquery');

function createLabel(title) {
  return $('<div class="label">' + title + '</div>')
}

function createInfoText(info) {
  return $('<div class="info-text">' + info + '</div>')
}

function createInfoLine(label, info) {
  var segment = $('<div class="info-line"></div>');
  segment.append(createLabel(label));
  segment.append($('<div class="separator"></div>'));
  segment.append(createInfoText(info));
  return segment
}

function createInfoUnorderedList(label, items) {
  var segment = $('<div class="info-line"></div>');
  segment.append(createLabel(label));
  segment.append($('<div class="separator"></div>'));
  var list = $('<ul></ul>');
  for(i=0;i<items.length;i++) {
    list.append('<li>' + items[i] + '</li>')
  }
  segment.append(list);
  return segment;
}

function createInfoOrderedList(label, items) {
  var segment = $('<div class="info-line"></div>');
  segment.append(createLabel(label));
  segment.append($('<div class="separator"></div>'));
  var list = $('<ol></ol>');
  for(i=0;i<items.length;i++) {
    list.append('<li>' + items[i] + '</li>')
  }
  segment.append(list);
  return segment;
}

function createToolTipBox(city, state, owner) {
  var returnEle = $('<div></div>');
  var tooltip = $('<div class="tooltip"></div>');

  var location = city + ', ' + state;
    if (city == null) {
    location = state;
  }
    else if (state == null) {
    location = city
  }

  tooltip.append(createInfoLine("Location", location));
  tooltip.append(createInfoLine("Owner", owner));

  returnEle.append(tooltip);
  return returnEle;
}

function createSelectOption(options, id, title) {
  var boundingBox = $('<div class="select-box"></div>');
  boundingBox.append($('<span class="select-title">' + title + '</span>'))

  var selectContainer = $('<span class="select-container">');
  boundingBox.append(selectContainer);

  var select = $('<select id="' + id + '" multple="multiple"></select>');
  selectContainer.html(select);

  for(var optionName in options) {
    select.append($('<option value="' + optionName + '"/>').html(options[optionName]));
  }
  $("<span class='genericon genericon-downarrow'></span>").appendTo(selectContainer);
  return boundingBox;
}

function createButton(id, label, clickFunc) {
  var button = $('<div class="button" id="' + id + '">' + label + '</div>');
  button.click(clickFunc);
  return button;
}

function createSmallButton(id, label, clickFunc) {
  var button = createButton(id, label, clickFunc);
  button.addClass('small');
  return button;
}

function createLargeButton(id, label, clickFunc) {
  var button = createButton(id, label, clickFunc);
  button.addClass('large');
  return button;
}

function createCheckBox(id,title, clickFunc) {
  var checkboxInput = $('<input id="'+id+'" type="checkbox" value="true" name="check" checked/>');
  checkboxInput.click(clickFunc);
  var checkboxCenter = $('<label for="'+id+'"></label>');
  var checkbox = $('<div class="checkbox"></div>')
  checkbox.append(checkboxInput);
  checkbox.append(checkboxCenter);

  var checkboxTitle = $('<div class="checkboxTitle">'+title+'</div>');

  var checkboxContainer = $('<div class="checkboxContainer"></div>');
  checkboxContainer.append(checkbox);
  checkboxContainer.append(checkboxTitle);

  return checkboxContainer;
}

exports.createInfoLine = createInfoLine;
exports.createInfoUnorderedList = createInfoUnorderedList;
exports.createInfoOrderedList = createInfoOrderedList;
exports.createToolTipBox = createToolTipBox;
exports.createSelectOption = createSelectOption;
exports.createButton = createButton;
exports.createLargeButton = createLargeButton;
exports.createSmallButton = createSmallButton;
exports.createCheckBox = createCheckBox;
