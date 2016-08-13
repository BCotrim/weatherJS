'use strict';

var YahooApi = new function() {
  var QUERY = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"%s\") and u="c"';
  var URL_PREFIX = 'https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=';

  this.WEEK_DAYS = {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
    Sun: 'Sunday'
  };

  this.WEATHER_CODES = {
    0:	'wi-tornado',
    1:	'wi-day-storm-showers',
    2:	'wi-hurricane',
    3:	'wi-day-thunderstorm',
    4:	'wi-day-thunderstorm',
    5:	'wi-snow-wind',
    6:	'wi-sleet',
    7:	'wi-sleet',
    8:	'wi-snowflake-cold',
    9:	'wi-snowflake-cold',
    10:	'wi-rain',
    11:	'wi-rain',
    12:	'wi-rain',
    13:	'wi-snow',
    14:	'wi-snow',
    15:	'wi-snow',
    16:	'wi-snow',
    17:	'wi-hail',
    18:	'wi-sleet',
    19:	'wi-dust',
    20:	'wi-fog',
    21:	'wi-day-haze',
    22:	'wi-fog',
    23:	'wi-wind',
    24:	'wi-wind',
    25:	'wi-snowflake-cold',
    26:	'wi-cloudy',
    27:	'wi-night-alt-cloudy',
    28:	'wi-day-cloudy',
    29:	'wi-night-alt-cloudy',
    30:	'wi-day-cloudy',
    31:	'wi-night-clear',
    32:	'wi-day-sunny',
    33:	'wi-night-clear',
    34:	'wi-day-sunny',
    35:	'mixed-rain-hail',
    36:	'wi-day-sunny',
    37:	'wi-day-thunderstorm',
    38:	'wi-day-thunderstorm',
    39:	'wi-day-thunderstorm',
    40:	'wi-showers',
    41:	'wi-snow',
    42:	'wi-snow',
    43:	'wi-snow',
    44:	'wi-day-cloudy',
    45:	'wi-day-thunderstorm',
    46:	'wi-snow',
    47:	'wi-day-thunderstorm',
    3200: 'question'
  };

  this.getRequestUrl = function(text) {
    return URL_PREFIX + QUERY.replace('%s', text);
  };
};
