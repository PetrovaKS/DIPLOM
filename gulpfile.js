const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const njk = require('gulp-nunjucks-render');
const beautify = require('gulp-beautify');


gulp.task('css', function() {
    return gulp.src('scss/*.scss').pipe(sass()).pipe(gulp.dest('css/'));
})

gulp.task('html', function() {
    return gulp.src('templates/pages/*.+(html|njk)')
        .pipe(
            njk({
                path: ['templates'],
            })
        )
        .pipe(beautify.html({ indent_size: 4, preserve_newlines: false }))
        .pipe(gulp.dest('./'))
})


gulp.task('default', function () {
    return gulp.watch(['scss/**/*', 'templates/**/*'], gulp.series('css', 'html'))
})