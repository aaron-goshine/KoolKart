'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var serverPort = 8080;
var livereloadPort = 35729;
var reactify = require('reactify');
var source = require("vinyl-source-stream");
var browserify = require('browserify');
var to5ify = require('6to5ify');

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('connectServer', plugins.serve({
  root: 'dist',
  port: serverPort,
  middleware: require('connect-livereload')({port: livereloadPort})
}));

gulp.task("browser", ['connectServer'], function() {
  gulp.src("./dist/index.html")
    .pipe(plugins.open("", {url: "http://localhost:" + serverPort}));
});

gulp.task('liveServer', function() {
  plugins.livereload.listen(livereloadPort);
});

gulp.task('watch', function() {
  plugins.watch(['./dist/*.html', './dist/css/*.css', './dist/js/*.js', './dist/images/**/*'], function() {
    plugins.livereload.changed("file", livereloadPort);
  });
});

gulp.task('html', function() {
  gulp.src(['./index.html'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('assest', function() {
  gulp.src(['./app/fonts/*'])
    .pipe(gulp.dest('dist/fonts/'));

  gulp.src(['./app/images/*'])
    .pipe(gulp.dest('dist/images/'));

  gulp.src(['./app/mock/*'])
    .pipe(gulp.dest('dist/mock/'));
});


gulp.task('watchHtml', function() {
  plugins.watch(['./index.html'], function() {
    gulp.start('html');
  })
});

gulp.task('less', function() {
  gulp.src(['app/css/less/*.less', 'app/css/**/*.css'])
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('styles.css'))
    .on('error', swallowError)
    .pipe(plugins.less())
    .on('error', swallowError)
    .pipe(plugins.sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watchLess', function() {
  plugins.watch(['./app/css/less/*.less', './app/css/**/*.css'], function() {
    gulp.start('less');
  })
});

gulp.task('scripts', function() {
  var bundle = browserify('./app/js/app.jsx', {
    debug: true,
    extensions: ['.js', '.jsx', '.json']
  });
  bundle.on('error', swallowError);
  bundle.transform(reactify);
  bundle.on('error', swallowError);
  bundle.transform(to5ify);
  bundle.on('error', swallowError);
  return bundle.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watchScript', function() {
  plugins.watch('./app/js/**', function() {
    gulp.start('scripts');
  })
});

//Minify javascript files
gulp.task('uglify', function() {
  gulp.src(['app/js/*.js', '!app/js/*.min.js'])
    .pipe(plugins.uglify())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest('app/js'))
});

gulp.task('cssmin', function() {
  gulp.src(['app/css/*.css', '!css/*.min.css'])
    .pipe(plugins.cssmin())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('default',
  [
    'connectServer',
    'browser',
    'liveServer',
    'watch',
    'watchLess',
    'watchScript',
    'watchHtml',
    'assest'
  ]);

