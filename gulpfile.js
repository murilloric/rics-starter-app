var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var processhtml = require('gulp-processhtml');

gulp.task('concat-css', function() {
  return gulp.src(['./app/css/app.css'])
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('concat-js', function() {
  return gulp.src(['./app/js/app.js', './app/js/services.js', './app/js/controller.js', './app/js/filters.js'])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./app/concat/'));
});

gulp.task('min-js', ['concat-js'], function() {
	return gulp.src('./app/concat/app.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('del-js', ['concat-js', 'min-js' , 'html-replace'], function() {
	return del([
    	'./app/concat',
  	]);
});

var opts = {}
gulp.task('html-replace', function () {
    return gulp.src('./app/*.html')
               .pipe(processhtml(opts))
               .pipe(gulp.dest('dist'));
});

var filesToMove = [
        './app/partials/**/*.*',
        './app/dep/ionic-v1.2.0/css/**.min.css',
        './app/dep/ionic-v1.2.0/js/**',
        './app/dep/ionic-v1.2.0/fonts/**'
    ];

gulp.task('move',[], function(){
  gulp.src(filesToMove, { base: './app' })
  .pipe(gulp.dest('dist'));
});

gulp.task('clean-dist',[], function(){
	return del([
    	'./dist/',
  	]);
});

gulp.task('default', ['concat-css', 'concat-js', 'min-js', 'del-js' , 'html-replace', 'move']);