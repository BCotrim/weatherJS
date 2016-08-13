"use strict";

var debounce = function () {
  var timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  }
}();

var HttpRequest = new function() {
  var ERROR = 'Failed to complete the request.';

  function getAsync(url, callback) {
    var STATE = {
      ready: 4
    };

    var HTTP_STATUS = {
      ok: 200
    };

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === STATE.ready) {
        if (xmlHttp.status === HTTP_STATUS.ok) {
          callback(null, xmlHttp.responseText);
        } else {
          callback(ERROR);
        }
      }
    };

    xmlHttp.open('GET', url);
    xmlHttp.send();
  }

  this.getAsync = getAsync;
};

var TableUtils = new function() {

  function clearTable(table) {
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i >= 0; i--) {
      table.deleteRow(i);
    }
  }

  function insertValues(table, values) {
    var row = table.insertRow(-1);
    values.forEach(function (value, index) {
      var cell = row.insertCell(-1);
      // LAST TD IN A ROW IS THE IMAGE
      if (index === values.length - 1) {
        var icon = document.createElement('i');
        icon.classList.add('wi');
        icon.classList.add(value);
        cell.appendChild(icon);
      } else {
        cell.innerText = value;
      }
    });
  }

  this.clearTable = clearTable;
  this.insertValues = insertValues;
};
