var DEBOUNCE_TIMER = 1000;

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
  var yahooRequest = new YahooAPIRequest(value);
  httpGetAsync(yahooRequest.url, responseHandler);
}
