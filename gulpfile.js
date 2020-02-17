'use strict'
var gulp        = require('gulp'),
    csso        = require('gulp-csso'),
    header      = require('gulp-header'),
    plumber     = require('gulp-plumber'),
    rename      = require('gulp-rename'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync').create();

  sass.compiler = require('node-sass');
//load pkg
var pkg         = require('./package.json'),
    banner      = ['/**',
                   '* <%=pkg.name%> - <%= pkg.description %>',
                   '* @author <%= pkg.author%>',
                   '* @version v<%= pkg.version %>',
                   '* @link <%=pkg.homepage%>',
                   '* @license <%= pkg.license %>',
                   '*/',
                   ''].join('\n');

//sass
gulp.task('sass', function() {
    return gulp.src('./sass/main.sass')
          .pipe(plumber())
          .pipe(sass())
          .pipe(header(banner, { pkg : pkg} ))
          .pipe(gulp.dest('./css'))
          .pipe(browserSync.stream())
          .pipe(csso())
          .pipe(rename({extname: '.min.css'}))
          .pipe(gulp.dest('./css'))
          .pipe(browserSync.stream())
});

gulp.task('watch', function() {
    gulp.watch(('./sass/**/*.sass'), ['sass']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

//serve
gulp .task('serve',function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
});
//watch
gulp.task('build', ['sass']);
gulp.task('default', ['serve','watch']);
