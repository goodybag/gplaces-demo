var fs        = require('fs');
var gulp      = require('gulp');
var pkg       = require('./package.json');
var config    = require('./config');
gulp.util     = require('gulp-util');

var globs = {
  scripts: ['*.js', 'lib/*.js', 'public/js/*.js', 'public/js/lib/*.js', 'public/js/views/*.js']
};

globs.lint = globs.scripts.concat([]);

gulp.task( 'scripts', function(){
  return require('browserify')({
      debug: true
    })
    .add('./public/js/app.js')
    .bundle()
    .pipe( fs.createWriteStream('./public/dist/app.js') );
});

gulp.task( 'less', function(){
  return gulp.src('less/app.less')
    .pipe( require('gulp-less')() )
    .pipe( require('gulp-autoprefixer')() )
    .pipe( gulp.dest('public/dist') );
});

gulp.task( 'font-awesome', function(){
  return gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe( gulp.dest('./public/dist/font') );
});

gulp.task( 'lint', function(){
  return gulp.src( globs.lint )
    .pipe( require('gulp-jshint')({
      "laxcomma": true,
      "sub": true,
      "globals": {
        "console": true,
        "module": true
      }
    }))
    .pipe( require('gulp-jshint').reporter('jshint-stylish') );
});

gulp.task( 'server', function( done ){
  require('./lib/server').listen( config.http.port, function( error ){
    if ( error ) return done( error );

    gulp.util.log( 'Server started on port ' + gulp.util.colors.blue( config.http.port ) );

    done();
  });
});

gulp.task( 'watch', function(){
  gulp.watch( globs.lint, ['lint'] );
  gulp.watch( globs.scripts, ['scripts'] );
  gulp.watch( ['less/*.less', 'less/**/*.less'], ['less'] );
});

gulp.task( 'build', [ 'less', 'font-awesome', 'lint', 'scripts' ] );
gulp.task( 'default', [ 'build', 'server', 'watch' ] );