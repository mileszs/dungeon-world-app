var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.type('text/plain');
  res.send('index mother fucker');
});

app.get('/characters/:id', function(req, res) {
  res.type('text/plain');
  res.send(req.params.id);
});

app.post('/characters', function(req, res) {
  res.type('text/plain');
  res.send(req.query);
});


module.exports = app;
