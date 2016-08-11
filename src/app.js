var express = require('express');
var SERVER_PORT = 3000;

var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(SERVER_PORT, function() {
  console.log('Server listening on port 3000');
});
