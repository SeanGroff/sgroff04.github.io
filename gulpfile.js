// Reference https://css-tricks.com/gulp-for-beginners/

const gulp = require('gulp');
// const bower = require('gulp-bower');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const jade = require('gulp-jade');

// gulp.task('bower', () => {
//    return bower()
//       .pipe(gulp.dest('bower_components'));
// });

gulp.task('jade', () => {
   return gulp.src('src/templates/index.jade')
      .pipe(jade())
      .pipe(gulp.dest('./'))
      .pipe(browserSync.reload({
         stream: true
      }));
});

gulp.task('sass', () => {
   return gulp.src('src/sass/**/*.scss')
      // .pipe(sass({
      //    style: 'compressed',
      //    loadPath: [
      //       'bower_components/font-awesome/scss'
      //    ]
      // }))
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
         baseDir: './'
      },
   });
});

// gulp.task('icons', () => {
//    return gulp.src('bower_components/font-awesome/fonts/**.*')
//       .pipe(gulp.dest('dist/fonts'));
// });

gulp.task('default', ['jade', 'sass', 'babel']);

gulp.task('watch', ['browserSync', 'jade', 'sass', 'babel'], () => {
   gulp.watch('src/sass/**/*.scss', ['sass']);
   gulp.watch('src/templates/**/*.jade', ['jade']);
   gulp.watch('src/scripts/**/*.js', browserSync.reload);
});
