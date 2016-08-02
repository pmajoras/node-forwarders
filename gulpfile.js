'use strict';
var eslint = require('gulp-eslint');
var gulp = require('gulp');

var paths = {
  appScripts: ['app/**/*.js']
};

gulp.task('eslint:app', function () {
  return gulp.src(paths.appScripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch:js', function () {
  gulp.watch(paths.appScripts, ['eslint:app']);
});

// Builds the application
gulp.task('default', ['eslint:app', 'watch:js']);
