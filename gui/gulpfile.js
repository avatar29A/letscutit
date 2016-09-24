/**
 * Created by bglebov on 20.09.2016.
 */

var gulp = require('gulp');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var gulpsync = require('gulp-sync')(gulp);

gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('bulma', function () {
   return gulp.src('node_modules/bulma/bulma.sass')
       .pipe(sass())
       .pipe(gulp.dest('css'))
});

gulp.task('concat-css', function () {
   return gulp.src("css/*.css")
       .pipe(concat("styles.css"))
       .pipe(gulp.dest("css"))
});

gulp.task('clean', function () {
    return gulp.src("css", {read: false})
        .pipe(clean());
});

gulp.task('default', gulpsync.sync(['clean', 'sass', 'concat-css', 'bulma']));