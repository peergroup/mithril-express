/*jslint node: true */
"use strict";

var gulp = require('gulp'),
    server = require('gulp-express'),
    less = require('gulp-less'),
    path = require('path'),
    msx = require('gulp-msx');

gulp.task('server', function () {
    server.run(['./bin/www']);
    gulp.watch(['./public/javascripts/**/*.js', './public/*.html'], server.notify);
    gulp.watch(['./client/stylesheets/*.less'], function(event){
        server.notify(event);
        return gulp.src('./client/stylesheets/*.less')
            .pipe(less({
                paths: [ path.join(__dirname, 'less', 'includes') ]
            }))
            .pipe(gulp.dest('./public/stylesheets'));
        //pipe support is added for server.notify since v0.1.5,
        //see https://github.com/gimm/gulp-express#servernotifyevent
    });
    gulp.watch(['app.js', 'routes/**/*.js', 'models/**/*.js'], [server.run]);

    var jsxPath = './client/javascripts/**/*.jsx';
    gulp.watch([jsxPath], {verbose: true}, function () {
        return gulp.src(jsxPath)
            .pipe(msx({harmony: true}))
            .pipe(gulp.dest('./public/javascripts'));
    });

});