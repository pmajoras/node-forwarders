'use strict';
var gulp = require('gulp');
var tslint = require('gulp-tslint');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  appScripts: ['app/**/*.ts']
};

gulp.task('clean-release', () => {
  del.sync(['release/**/*.ts']);
});

gulp.task('ts:lint:app', () => {
  gulp.src(paths.appScripts)
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report());
});

gulp.task('ts:compile:app', function () {
  var tsResult = gulp.src(paths.appScripts)
    .pipe(sourcemaps.init())
    .pipe(ts({
      noImplicitAny: true
    }));
  return tsResult.js.pipe(sourcemaps.write('maps')).pipe(gulp.dest('release'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch:ts', function () {
  gulp.watch(paths.appScripts, ['ts:lint:app', 'ts:compile:app']);
});

gulp.task('compile', ['ts:lint:app', 'ts:compile:app']);
gulp.task('build', ['clean-release', 'compile']);

gulp.task('develop', function () {
  gulp.start('build', () => {

    nodemon({
      script: 'release/index.js'
      , ext: 'ts'
      , ignore: ['release/*']
      , tasks: ['build']
    }).on('restart', function () {
      console.log('restarted!');
    });
  });
});
