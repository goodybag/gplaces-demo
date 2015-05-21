require('forky')(
  __dirname + '/lib/start-server'
, process.env.WEB_CONCURRENCY || 1
);