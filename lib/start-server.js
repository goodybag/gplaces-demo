var config = require('../config');

require('./server').listen( config.http.port, function( error ){
  if ( error ){
    console.log('error starting server', error);
    process.exit(1);
  }

  console.log( 'Server started on port', config.http.port );
});