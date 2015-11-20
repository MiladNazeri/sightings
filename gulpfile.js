'use strict';

// All used modules.
var babel = require('gulp-babel');
var gulp = require('gulp');
var runSeq = require('run-sequence');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var karma = require('karma').server;
var istanbul = require('gulp-istanbul');

// Development tasks
// --------------------------------------------------------------
//
//
gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('reloadCSS', function () {
    return gulp.src('./dist/style.css').pipe(livereload());
});


gulp.task('lintJS', function () {

    return gulp.src(['./src/js/**/*.js', './server/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});

gulp.task('testServerJS', function () {
    require('babel/register');
    return gulp.src('./tests/server/**/*.js', {
        read: false
    }).pipe(mocha({ reporter: 'spec' }));
});

gulp.task('testServerJSWithCoverage', function (done) {
    gulp.src('./server/**/*.js')
        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src('./tests/server/**/*.js', {read: false})
                .pipe(mocha({reporter: 'spec'}))
                .pipe(istanbul.writeReports({
                    dir: './coverage/server/',
                    reporters: ['html', 'text']
                }))
                .on('end', done);
        });
});

gulp.task('testBrowserJS', function (done) {
    karma.start({
        configFile: __dirname + '/tests/browser/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('buildCSS', function () {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./dist'));
});



gulp.task('seedDB', function () {

    var users = [
        { email: 'testing@fsa.com', password: 'testing123' },
        { email: 'joe@fsa.com', password: 'rainbowkicks' },
        { email: 'obama@gmail.com', password: 'potus' }
    ];

    var dbConnected = require('./server/db');

    return dbConnected.then(function () {
        var User = require('mongoose').model('User');
        return User.create(users);
    }).then(function () {
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
    });

});


gulp.task('default', function () {

    gulp.watch('server/**/*.js', ['lintJS']);

    // Run server tests when a server file or server test file changes.
    gulp.watch(['tests/server/**/*.js'], ['testServerJS']);

    // Run browser testing when a browser test file changes.
    gulp.watch('tests/browser/**/*', ['testBrowserJS']);

});

