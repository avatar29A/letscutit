/**
 * Created by bglebov on 20.09.2016.
 */

var gulp = require('gulp');

var sass = require('gulp-sass');
var concat = require('gulp-concat');


gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('bulma', function () {
   return gulp.src('scss/bulma/bulma.sass')
       .pipe(sass())
       .pipe(gulp.dest('css'))
});

gulp.task('concat-css', function () {
   return gulp.src("css/*.css")
       .pipe(concat("styles.css"))
       .pipe(gulp.dest("css"))
});

gulp.task('stream', function () {
    gulp.watch("scss/*.scss", ['sass']);
});

gulp.task('default', ['sass', 'bulma', 'stream']);