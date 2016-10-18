/**
 * Created by bglebov on 20.09.2016.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('common-sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('app-sass', function () {
    var paths = [
        "app/**/*.scss"
    ];
    return gulp.src(paths, {base: "./"})
        .pipe(sass())
        .pipe(gulp.dest('./'));
});


gulp.task('bulma', function () {
    return gulp.src('scss/bulma/bulma.sass')
        .pipe(sass())
        .pipe(gulp.dest('css'))
});

gulp.task('stream', function () {
    gulp.watch("app/*.scss", ['sass']);
});

gulp.task('default', ['common-sass', 'app-sass', 'bulma', 'stream']);