var express = require('express');
var config  = require('../config');

var app = module.exports = express();

app.use( require('body-parser').json() );
app.use( require('body-parser').urlencoded({ extended: true }) );

app.use( express.static( __dirname + '/../public' ) );

app.get('/api/places'
, require('gplaces').proxy({
    key: config.google.key
  })
);