var $         = require('jquery');
var request   = require('superagent');
var highlight = require('highlight.js');

require('./lib/code-stripper')().onDomReady();

require('gplaces').http( function( input, callback ){
  request
    .get('/api/places')
    .query({ input: input })
    .end( callback );
});

highlight.initHighlightingOnLoad();

$(function(){
  setTimeout( function(){
    $('#intro-section [data-gplaces]')[0].focus();

  // 1.5 seconds for dramatic effect
  }, 1500 );
});