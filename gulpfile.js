const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const input = './scss/**/*.scss';
const output = './assets/css';

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

const autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

function sassBuild() {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
}

gulp.task('sass', sassBuild);

function serve() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(input, sassBuild);
  gulp.watch("*.html").on('change', browserSync.reload);
}

gulp.task('serve', gulp.series([sassBuild, serve]));

function watch() {
  return gulp
    .watch(input, sassBuild)
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
}

gulp.task('watch', watch);

gulp.task('default', serve);

gulp.task('prod', function () {
  return gulp
    .src(input)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});
