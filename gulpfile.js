var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var processhtml = require('gulp-processhtml');

var paths = {
  sass: ['./app/scss/**/*.scss']
};



gulp.task('sass', function(done) {
  gulp.src('./app/scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./app/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    //.pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./app/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('concat-css', function() {
  return gulp.src(['./app/css/*'])
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
        './app/lib/ionic/css/**.min.css',
        './app/lib/ionic/js/**',
        './app/lib/ionic/fonts/**'
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