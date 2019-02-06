const gulp = require('gulp');
const shell = require('gulp-shell');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const sassModules = ['common', 'round', 'lobby', 'tournament', 'palette'].reduce((mods, key) => {
  mods[key] = {
    key: key,
    files: 'src/scss/' + key + '/**/*.scss',
    builds: 'src/scss/' + key + '/build/*.scss'
  };
  return mods;
}, {});
const sassOutput = 'assets/css';

const htmlInput = 'src/html/**/*.html';
const htmlOutput = 'site/**/*.html';

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

const autoprefixerOptions = {
  // https://browserl.ist/?q=last+5+versions%2C+Firefox+ESR%2C+not+IE+<+12%2C+not+<+0.1%25%2C+not+IE_Mob+<+12
  browsers: 'last 5 versions, Firefox ESR, not IE < 12, not < 0.1%, not IE_Mob < 12'.split(', ')
};

const htmlBuild = nameFun('html', shell.task('eleventy'));

gulp.task('html', htmlBuild);

function sassBuilder(module) {
  return nameFun(module.key, () => {
    return gulp
      .src(module.builds)
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(gulp.dest(sassOutput))
      .pipe(browserSync.stream());
  });
}
const sassBuilders = Object.values(sassModules).map(sassBuilder);

gulp.task('sass', gulp.series(sassBuilders));

function serve() {
  browserSync.init({
    server: {
      baseDir: "."
    }
  });

  Object.values(sassModules).filter(m => m.key != 'common').forEach(module => gulp.watch(module.files, sassBuilder(module)));
  gulp.watch(sassModules.common.files, gulp.parallel(sassBuilders));
  gulp.watch(htmlInput, htmlBuild);
  gulp.watch(htmlOutput).on('change', browserSync.reload);
}

gulp.task('default', gulp.series([
  gulp.parallel([htmlBuild, ...sassBuilders]),
  serve
]));

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
    .src('src/scss/*/build/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(sassOutput));
});

function nameFun(name, f) {
  Object.defineProperty(f, 'name', {value: name, writable: false});
  return f;
}
