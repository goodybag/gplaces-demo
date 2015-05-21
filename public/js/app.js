var $         = require('jquery');
var request   = require('superagent');
var highlight = require('highlight.js');
var demo      = require('./views/demo');

require('./lib/code-stripper')().onDomReady();

require('gplaces').http( function( input, callback ){
  request
    .get('/api/places')
    .query({ input: input })
    .end( callback );
});

highlight.initHighlightingOnLoad();

$(function(){
  var $demoinput = $('#intro-section [data-gplaces]').eq(0);

  setTimeout( function(){
    $demoinput[0].focus();
    demo( $demoinput[0] ).run();

  // 1.5 seconds for dramatic effect
  }, 1500 );
});