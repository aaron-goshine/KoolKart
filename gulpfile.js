var browserify = require('browserify');
var concat = require('gulp-concat');
var del = require('del');
var ES6Shim = require('es6-shim');
var fs = require('fs');
var gReact = require('gulp-react');
var gReplace = require('gulp-replace');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var gutil = require('gulp-util');
var htmlMin = require('gulp-htmlmin');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

var dev = true;

var sourcePaths = {
  script: __dirname + '/js/**',
  css: __dirname + '/css/**'
};

var destPaths = {
  script: __dirname + '/dist/js/',
  css: __dirname + '/dist/css/'
};


gulp.task('clean', function (callback) {
  del([__dirname + '/dist/'], callback);
});


//gulp.task('lib', function () {
//  return gulp.src('src/*.js')
//    .pipe(gReact({harmony: true}))
//    .pipe(gReplace(/__DEV__/g, false))
//    .pipe(gulp.dest('lib'));
//
//})

gulp.task('scripts', function () {
  var watchlist = Object.assign(watchify.args, {
    debug: true,
    extensions: ['.js', '.jsx', '.json']
  });


  var bundler = browserify(['./js/app.js'], watchlist);
  console.log(bundler);
  return ;
  bundler = watchify(bundler);



  bundler.transform('reactify', {es6: true});
  bundler.on('update', rebundle);
  bundler.on('log', gutil.log.bind(gutil, 'Rebundle'))

  return rebundle();

  function rebundle() {
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(streamify(uglify()))
      .pipe(gulp.dest(destPaths.scripts));

  }

});


gulp.task('browserify', function () {
  return browserify(browserifyConfig)
    .bundle()
    .pipe(source('Flux.js'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('publish', ['clean', 'default']);
gulp.task('default', ['scripts']);


