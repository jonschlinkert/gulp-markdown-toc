'use strict';

var path = require('path');
var gulp = require('gulp');
var del = require('delete');
var toc = require('./');

gulp.task('toc', function() {
  return gulp.src('test/fixtures/*.md')
    .pipe(toc({
      index: function(file) {
        file.basename = 'whatever.md';
        return 'blah';
      },
      sort: function(a, b) {
        return a.relative < b.relative
      }
    }))
    .pipe(gulp.dest('temp'));
});

gulp.task('delete', function(cb) {
  return del.promise('temp');
});

gulp.task('default', ['delete', 'toc']);

