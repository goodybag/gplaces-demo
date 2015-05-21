process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {
  http: {
    port: ({
      dev: 3030
    , production: process.env['PORT']
    })[ process.env.NODE_ENV ]
  }

, google: {
    key: process.env.GOOGLE_API_KEY
  }
};