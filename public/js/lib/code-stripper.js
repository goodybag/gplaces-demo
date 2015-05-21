module.exports = function( options ){
  return Object.create({
    onDomReady: function(){
      document.addEventListener('DOMContentLoaded', function(){
        Array.prototype.slice
          .call( document.querySelectorAll('code') )
          .forEach( this.strip.bind( this ) );
      }.bind( this ));
    }

  , restoreEmptyAttributes: function( el ){
      el.innerHTML = el.innerHTML
        .replace( /=\"\"/g, '' );

      return this;
    }

  , strip: function( el ){
      var output = el.innerHTML;

      var replaceMap = {
        '<': '&lt;'
      , '>': '&gt;'
      , '&': '&amp;'
      , '\'': '&apos;'
      , '"': '&quot;'
      , '`': '&grave;'
      };

      var regex = new RegExp( Object.keys( replaceMap ).join('|'), 'gi' );

      el.innerHTML = output.replace( regex, function( match ){
        return replaceMap[ match ];
      });

      this.restoreEmptyAttributes( el );

      return this;
    }
  });
};