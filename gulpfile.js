'use strict';
 
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var concat       = require('gulp-concat');
var cssnano      = require('gulp-cssnano');
var rename       = require('gulp-rename');
var clean        = require('gulp-clean');

var sourcemaps = require('gulp-sourcemaps');

var config = {
  styles: {
    src: './assets/stylesheets/**/*.scss',
    dist: './dist/css'
  },
  js: {
    src: './assets/javascripts/**/*.js',
    dist: './dist/js'
  }
}

// copia as fontes de assets para dist
gulp.task('fonts', function () {
  return gulp.src('./assets/fonts/*').pipe(gulp.dest('./dist/fonts'));
});
 
gulp.task('sass', function () {

  var sassConfig = { outputStyle: 'expanded' };

  gulp.src(config.styles.src)
      .pipe(sass(sassConfig).on('error', sass.logError))
      .pipe(postcss([ autoprefixer() ]))
      .pipe(gulp.dest(config.styles.dist));

});

gulp.task('minify-css', function () {

  gulp.src([
    './dist/css/*.css',
    '!./dist/css/*.min.css'
  ])
  .pipe(sourcemaps.init())
  .pipe(cssnano())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(config.styles.dist));

});

gulp.task('scripts', function() {
  
  gulp.src([
    './assets/javascripts/bootstrap.js', 
    './assets/javascripts/custom/*.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('bootstrap.js'))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(config.js.dist));

});

// exclui a pasta dist do projeto
gulp.task('clean', function () {
  return gulp.src(['./dist'], {read: false}).pipe(clean());
});

// watchers
gulp.task('dev', function () {
  
  var onChange = function (event) {
    console.log('File ' + event.type + ': ' + event.path);
  }

  gulp.watch(config.styles.src, ['sass']).on('change', onChange);
  gulp.watch(config.js.src, ['scripts']).on('change', onChange);

});

gulp.task('default', ['dev']);