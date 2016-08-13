"use strict";

var WeatherJS = new function() {
  var DEBOUNCE_TIMER = 500;
  var NOT_FOUND_ERROR = 'Could not find that location.';

  function valueChanged() {
    debounce(query, DEBOUNCE_TIMER);
  }

  function responseHandler(error, response) {
    if (error) {
      WeatherView.setViewError(error);
    } else {
      var obj = JSON.parse(response);
      if (!obj || !obj.query || !obj.query.results || !obj.query.results.channel) {
        WeatherView.setViewError(NOT_FOUND_ERROR);
      } else {
        WeatherView.setViewResults(obj.query.results.channel);
      }
    }
  }

  function query() {
    var value = document.getElementById('location').value;
    if (value) {
      WeatherView.setViewLoading();
      var yahooRequest = YahooApi.getRequestUrl(value);
      HttpRequest.getAsync(yahooRequest, responseHandler);
    } else {
      WeatherView.setViewDefaults();
    }
  }

  this.valueChanged = valueChanged;
};
