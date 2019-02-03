const gulp = require('gulp');
const shell = require('gulp-shell');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const sassInput = 'src/scss/**/*.scss';
const sassOutput = 'assets/css';

const htmlInput = 'src/html/**/*.html';

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

const autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

const htmlBuild = shell.task('eleventy');

gulp.task('html', htmlBuild);

function sassBuild() {
  return gulp
    .src(sassInput)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(sassOutput))
    .pipe(browserSync.stream());
}

gulp.task('sass', sassBuild);

function serve() {
  browserSync.init({
    server: {
      baseDir: "."
    }
  });

  gulp.watch(sassInput, sassBuild);
  gulp.watch(htmlInput, htmlBuild);
  gulp.watch("*.html").on('change', browserSync.reload);
}

gulp.task('default', gulp.series([htmlBuild, sassBuild, serve]));

// function watch() {
//   return gulp
//     .watch(sassInput, sassBuild)
//     .watch(htmlInput, htmlBuild)
//     .on('change', function(event) {
//       console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//     });
// }

// gulp.task('watch', watch);

gulp.task('prod', function () {
  return gulp
    .src(input)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(sassOutput));
});
