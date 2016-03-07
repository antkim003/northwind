var express = require('express');
var app = express();

var bodyParser = require('body-parser');

module.exports = app;

app.use('/', require('./routes/routes'));

app.use(function(err, req, res, next) {
  console.error(err);
  res.statuse(500).send(err.message);
});

