var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var copy = require('gulp-copy');

var paths = {
    scripts: ['./bower_components/jquery/dist/jquery.min.js', './bower_components/react/react.min.js', './bower_components/bootstrap/dist/js/bootstrap.min.js', './src/**/*.js'],
    styles: ['./bower_components/bootstrap/dist/css/bootstrap.css', './src/**/*.scss'],
    fonts: ['./bower_components/bootstrap/dist/fonts/**/*.*'],
    htmls: ['./src/index.html', './src/**/*.html']
};

gulp.task('scripts:concat', () => {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('styles:concat', () => {
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(concat('styles.scss'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src'));
});

gulp.task('styles:compile', () => {
    return gulp.src('./src/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('build', () => {
    runSequence(['scripts:concat', 'styles:concat', 'styles:compile']);
});

gulp.task('watch', () => {
    return gulp.src('./src/**/*.*')
        .pipe(watch('./src/**/*.*'))
        .pipe(gulp.dest('build'));
});

gulp.task('copy:fonts', () => {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('copy:html', () => {
    return gulp.src(paths.htmls)
        .pipe(gulp.dest('./dist/'));
});

gulp.task('copy', () => {
    runSequence(['copy:fonts', 'copy:html']);
});

gulp.task('default', () => {
    runSequence(['build', 'copy', 'watch'])
});