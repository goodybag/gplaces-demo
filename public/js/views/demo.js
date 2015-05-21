var $     = require('jquery');
var utils = require('../lib/utils');

module.exports = function( el, options ){
  return Object.create({
    el: el

  , options:  utils.defaults( options || {}, {
                text: '512 Brewing Austin, TX'
              , charInterval: 100
              , wordInterval: 300
              })

  , run: function(){
      var typeChars = function( str ){
        if ( str.length === 0 ){
          this.el.dispatchEvent( this.getEvent(40) );
          return setTimeout( this.el.dispatchEvent.bind( this.el, this.getEvent(13) ), 100 );
        }

        var c = str[0];

        this.el.value += c;

        this.el.dispatchEvent( this.getEvent( c ) );

        return setTimeout(
          typeChars.bind( this, str.substring(1) )
        , c === ' ' ? this.options.wordInterval : this.options.charInterval
        );
      }.bind( this );

      typeChars( this.options.text );

      return this;
    }

  , getEvent: function( c ){
      var evt = document.createEvent('HTMLEvents');
      evt.initEvent( 'keyup', true, true );
      evt.keyCode = typeof c === 'number' ? c : c.charCodeAt();
      evt.target = this.el;
      return evt;
    }
  });
};