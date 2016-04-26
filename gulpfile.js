'use strict';

// require('time-require')
var gulp = require('gulp');
var plugin = require('lazy-cache')(require);
var matchFile = require('./');

plugin('gulp-mocha', 'mocha');
plugin('gulp-istanbul', 'istanbul');
plugin('gulp-eslint', 'eslint');
plugin('through2', 'through');

gulp.task('coverage', function() {
  return gulp.src('index.js')
    .pipe(plugin.istanbul())
    .pipe(plugin.istanbul.hookRequire());
});

gulp.task('test', ['coverage'], function() {
  return gulp.src('test.js')
    .pipe(plugin.mocha({reporter: 'spec'}))
    .pipe(plugin.istanbul.writeReports());
});

gulp.task('lint', function() {
  return gulp.src('*.js')
    .pipe(plugin.eslint())
    .pipe(plugin.eslint.format());
});

gulp.task('example', function() {
  return gulp.src('{*,.*}')
    .pipe(filter(['*.json', '*.md']));
});

gulp.task('default', ['test', 'lint']);

function filter(pattern, options) {
  if (Array.isArray(pattern)) {
    pattern = '{' + pattern.join(',') + '}';
  }
  var isMatch = matchFile.matcher(pattern, options);
  var files = [];
  return plugin.through.obj(function(file, enc, next) {
    if (isMatch(file)) {
      files.push(file);
      next(null, file);
      return;
    }
    next();
  }, function(cb) {
    console.log(files);
    cb();
  });
}
