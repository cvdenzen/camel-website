const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const env = process.env.CAMEL_ENV || 'development'

gulp.task('minify', (done) => {
  if (env !== 'production') {
    done();
    return;
  }

  return gulp.src('public/**/*.html')
    .pipe(htmlmin({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      conservativeCollapse: true,
      useShortDoctype: true
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('imagemin', (done) => {
  if (env !== 'production') {
    done();
    return;
  }

  return gulp.src('public/**/*.{svg,png,gif,jpg,jpeg}')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({ plugins: [
        { removeViewBox: false },
        { cleanupIDs: { remove: false } },
        { removeTitle: false },
        { removeDesc: false }
      ] })
    ]))
    .pipe(gulp.dest('public'));
});
