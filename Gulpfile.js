var gulp = require('gulp');

gulp.task('css', function() {
  var postcss = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src('src/blackstar.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([require('autoprefixer'), require('precss')]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});
