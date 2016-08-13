"use strict";

var WeatherView = new function() {
  var NUMBER_OF_FORECAST_DAYS = 5;

  function setViewDefaults() {
    document.getElementById('results').classList.add('hidden');
    document.getElementById('errors').classList.add('hidden');
    document.getElementById('loading').classList.add('hidden');
  }

  function setViewResults(results) {
    var table = document.getElementById('forecast');
    TableUtils.clearTable(table);
    for (var i = 1; i <= NUMBER_OF_FORECAST_DAYS; i++) {
      var element = results.item.forecast[i];
      TableUtils.insertValues(table, [
        YahooApi.WEEK_DAYS[element.day],
        element.high + ' ºC',
        element.low + ' ºC',
        YahooApi.WEATHER_CODES[element.code]
      ]);
    }
    document.getElementById('details').innerText = results.location.city + ', ' + results.location.country;
    document.getElementById('temperature').innerText = results.item.condition.temp + ' ºC';
    document.getElementById('weather').classList.add(YahooApi.WEATHER_CODES[results.item.condition.code]);


    document.getElementById('results').classList.remove('hidden');
    document.getElementById('errors').classList.add('hidden');
    document.getElementById('loading').classList.add('hidden');
  }

  function setViewError(error) {
    document.getElementById('errors').innerText = error;

    document.getElementById('results').classList.add('hidden');
    document.getElementById('errors').classList.remove('hidden');
    document.getElementById('loading').classList.add('hidden');
  }

  function setViewLoading() {
    document.getElementById('results').classList.add('hidden');
    document.getElementById('errors').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');
  }

  this.setViewDefaults = setViewDefaults;
  this.setViewResults = setViewResults;
  this.setViewError = setViewError;
  this.setViewLoading = setViewLoading;
};
