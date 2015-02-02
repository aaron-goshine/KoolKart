'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var serverPort = 8080;
var livereloadPort = 35729;
var reactify = require('reactify');
var source = require("vinyl-source-stream");
var browserify = require('browserify');
var to5ify= require('6to5ify');

//============= server
gulp.task('connectServer', plugins.serve({
  root: 'app',
  port: serverPort,
  middleware: require('connect-livereload')({port: livereloadPort})
}));

gulp.task("broswer", ['connectServer'], function() {
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

//============= end server
gulp.task('less', function() {
  gulp.src('app/css/less/*.less')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.less())
    .on('error', console.error.bind('error'))
    .pipe(plugins.sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watchless', function() {
  plugins.watch('app/css/less/*.less', function() {
    gulp.start('less');
  })
});


gulp.task('scripts', function() {

  var bundle =  browserify('./app/js/app.jsx',{ debug: true });
  bundle.transform(reactify);
  bundle.transform(to5ify);
  bundle.on("error", function (err) { console.log("Error : " + err.message); });
  return bundle.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watchscript', function() {
  plugins.watch('./app/js/**', function() {
    gulp.start('scripts');
  })
});


browserify()
  
  .require("./script.js", { entry: true })
  



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

gulp.task('default', ['connectServer', 'broswer', 'liveServer', 'watch', 'watchless', 'watchscript']);

