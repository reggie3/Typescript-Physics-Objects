var gulp = require('gulp');


var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect'); //create local and remote servers
var plumber = require('gulp-plumber'); //used to pipe streams and prevent pipe 
var browserSync = require('browser-sync').create();
var print = require('gulp-print');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var webpack = require('webpack');
var sass = require('gulp-sass');
var jade = require('gulp-jade');

//custom config file
var conf = require("./conf.json");
var webpackConfig = require("./webpack.config.js");

/************************
 * build distribution
 */
gulp.task('dist', function(){
    gulp.src(conf.files.html).pipe(print()).pipe(gulp.dest(conf.dist.html));
    gulp.src(conf.files.assets).pipe(gulp.dest(conf.dist.assets));
    gulp.src(conf.files.js).pipe(gulp.dest(conf.dist.js));
    gulp.src(conf.files.css).pipe(gulp.dest(conf.dist.css));
});

/*************************************
 * copy the ts def files that are in the typings to the ts source folder so that
 * we can use them during production 
 */
gulp.task('tsdef', function(){
    gulp.src(conf.files.typings).pipe(print()).pipe(gulp.dest(conf.paths.tsdefs));
});


/**********************************
 * run Webpack task defined in webpack.config.js
 *  it compiles the typescript and builds souremaps
 */
gulp.task('wp', function(done){
    // gulp.src(conf.files.js)
    //     .pipe(del());
    webpack(webpackConfig).run(onBuild(done));
})

function onBuild(done){
     return function(err, stats) {
        if (err) {
            gutil.log('Error', err);
            if (done) {
                done();
            }
        } else {
            Object.keys(stats.compilation.assets).forEach(function(key) {
                gutil.log('Webpack: output ', gutil.colors.green(key));
            });
            gutil.log('Webpack: ', gutil.colors.blue('finished ', stats.toString()));
            if (done) {
                done();
            }
        }
    }
}

gulp.task('watch', function(){
    gulp.watch([conf.files.ts], ['wp']);
    gulp.watch([conf.files.jade], ['jade']);
    gulp.watch([conf.files.sass], ['sass']);
    gulp.watch([conf.files.typings], ['tsdef']);
});

/*************************************************
 * compile the jade files into html files
*/
gulp.task('jade', function (callback) {
    var YOUR_LOCALS = {};
    
    //get all the jade files in the jade directory and its subdirectory, but don't get jade includes
    var stream = gulp.src([conf.files.jade])
        .pipe(plumber({
        errorHandler: onError
        }))
        .pipe(print())
        .pipe(jade({
            pretty: true,
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest(conf.paths.base));
        
    return stream;
});

/********************************************
 * compile sass files
 */
//compile, concat, and autoprefix sass files and copy them to the source css direcotry
gulp.task('sass', function(){
    gulp.src(conf.files.sass)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(conf.paths.css))
});

/****************************************
 * Utilities
 */

//browsersyncc server
// create a dev server that updates when relavent source files change
gulp.task('bs', function () {
    browserSync.init({
        server:  "./src/",    //serve from the source directory
        reloadDelay: 1000
    });
        //watch for changes in the my javascript & vendor javascript, html, and css files & any asset changes
    gulp.watch(
     [conf.files.js, conf.files.html,conf.files.css]
    , browserSync.reload);  
});
    
//open dev files in server
gulp.task('condev', function () {
    connect.server({
        root: ['src'],
        port: 8000,
        livereload: true
    });
});
 
//open dist files in server 
gulp.task('condist', function () {
    connect.server({
        root: 'dist',
        port: 8001,
        livereload: true
    });
});



//Erro funciton that emits a beep sound and logs an error
var onError = function (err) {  
  gutil.beep();
  console.log(err);
};