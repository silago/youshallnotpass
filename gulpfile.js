'use strict';
var gulp = require('gulp'),
    browserSync = require("browser-sync"),
    watch = require('gulp-watch'),
    reload = browserSync.reload;

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};


gulp.task('html', function() {
    return gulp.src(['*.html'])
        .pipe(gulp.dest('build'))
        .pipe(reload({stream: true}));
})


gulp.task('bower_components', function() {
    return gulp.src(['bower_components/**/*'])
        .pipe(gulp.dest('build/src/vendor'))
        .pipe(reload({stream: true}));
})

gulp.task('assets', function() {
    return gulp.src(['assets/***'])
        .pipe(gulp.dest('build/assets'))
        .pipe(reload({stream: true}));
})


gulp.task('scripts', function() {
    return gulp.src(['src/**/*.js'])
        .pipe(gulp.dest('build/src'))
        .pipe(reload({stream: true}));
})

gulp.task('styles', function() {
    return gulp.src(['css/*'])
        .pipe(gulp.dest('build/css'))
        .pipe(reload({stream: true}));
})



gulp.task('webserver', function () {
    browserSync(config);
});



gulp.task('watch', function(){
    watch(['*.html'], function(event, cb) {
        gulp.start('html');
    });

    watch(['src/*'], function(event, cb) {
        gulp.start('scripts');
        gulp.start('bower_components');
    });

    watch(['assets/*'], function(event, cb) {
        gulp.start('assets');
    });



});


gulp.task('heroku', ['assets','bower_components','html','scripts','styles'], function() {
    //gulp.run('lr-server', 'scripts', 'styles');
});

gulp.task('default', ['assets','bower_components','html','scripts','styles','webserver','watch'], function() {
    //gulp.run('lr-server', 'scripts', 'styles');
});
