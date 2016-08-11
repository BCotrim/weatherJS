const DEBOUNCE_TIMER = 1000;

function valueChanged() {
  debounce(query, DEBOUNCE_TIMER);
}

var debounce = function() {
  var timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  }
}();

function setViewDefaults() {
  document.getElementById('description').textContent = "Please input location";
}

function setViewResults(results) {
  document.getElementById('description').textContent = results.channel.description;
}

function responseHandler(response) {
  var obj = JSON.parse(response);
  console.log(obj);

  if (!obj || !obj.query || !obj.query.results) {
    setViewDefaults();
  } else {
    setViewResults(obj.query.results);
  }
}

function query() {
  var value = document.getElementById('location').value;
  var url = buildRequest(value);
  httpGetAsync(url, responseHandler);
}

function buildRequest(text) {
  var query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"%s\")';
  var url = 'https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=';

  return url + query.replace("%s", text);
}

function httpGetAsync(url, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open('GET', url);
  xmlHttp.send();
}


