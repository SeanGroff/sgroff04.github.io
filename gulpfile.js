// Reference https://css-tricks.com/gulp-for-beginners/

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const jade = require('gulp-jade');

gulp.task('jade', () => {
   return gulp.src('src/templates/**/*.jade')
      .pipe(jade())
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.reload({
         stream: true
      }));
});

gulp.task('sass', () => {
   return gulp.src('src/sass/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.reload({
         stream: true
      }));
});

gulp.task('babel', () => {
   return gulp.src('src/js/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('browserSync', () => {
   browserSync.init({
      server: {
         baseDir: 'dist'
      },
   });
});

gulp.task('watch', ['browserSync', 'jade', 'sass', 'babel'], () => {
   gulp.watch('src/sass/**/*.scss', ['sass']);
   gulp.watch('src/templates/**/*.jade', ['jade']);
   gulp.watch('src/scripts/**/*.js', browserSync.reload);
});
