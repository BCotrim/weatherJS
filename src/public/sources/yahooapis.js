function YahooAPIRequest(value) {
  this.text = value;
  this.query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"%s\")';
  this.urlPrefix = 'https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=';
  this.url = this.urlPrefix + this.query.replace("%s", this.text);
}
