// Reference https://css-tricks.com/gulp-for-beginners/

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');

gulp.task('sass', () => {
   return gulp.src('src/scss/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.reload({
         stream: true
      }));
});

gulp.task('babel', () => {
   return gulp.src('src/scripts/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('dist'));
});

gulp.task('browserSync', () => {
   browserSync.init({
      server: {
         baseDir: 'src'
      },
   });
});

gulp.task('watch', ['browserSync', 'sass', 'babel'], () => {
   gulp.watch('src/scss/**/*.scss', ['sass']);
   gulp.watch('src/*.html', browserSync.reload);
   gulp.watch('src/scripts/**/*.js', browserSync.reload);
});
