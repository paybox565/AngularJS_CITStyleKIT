'use strict';

var gulp = require('gulp');
var rigger = require('gulp-rigger');
var sass = require('gulp-sass');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
var babelify = require('babelify');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var path = require('path');
var transform = require('vinyl-transform');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var _ = require('lodash');
var watchify = require('watchify');
var gzip = require('gulp-gzip');
var tar = require('gulp-tar');
var concatCss = require('gulp-concat-css');
var envify = require('envify/custom');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var normalize = require('node-normalize-scss').includePaths;
var jeet = require('node-jeet-sass').includePaths;

var srcRoot = '.';
var targetRoot = 'public';
var nodeModules = path.join(__dirname, 'node_modules');
var openSans = path.join(nodeModules, 'open-sans-fontface');
var fontAwesome = path.join(nodeModules, 'font-awesome');


var isProduction = false;

var config = {
    'styles': {
        'src': srcRoot + '/stylesheets/main.scss',
        'dest': targetRoot,
        'bundleName': 'style_guide.css',
        'watch': srcRoot + '/stylesheets/**/*.scss',
        'sassIncludePaths': [nodeModules],
        'cssIncludePaths': [nodeModules]
    },

    'scripts': {
        'src': [srcRoot + '/javascripts/app.js', srcRoot + '/javascripts/ng_app.js'],
        'dest': targetRoot,
        'bundleName': 'bundle.js',
        'watch': srcRoot + '/javascripts/**/*.js'
    },

   'index': {
        'src': srcRoot + '/*.html',
        'dest': targetRoot
    },

    'views': {
      'src': [srcRoot + '/views/**/**/**/*.html'],
      'dest': targetRoot + '/views'
    },

    'images': {
        'src': srcRoot + '/images/**/*',
        'dest': targetRoot + '/images'
    },

    'plugins': {
      'src': srcRoot + '/plugins/**/*',
      'dest': targetRoot + '/plugins'
    },

    'fonts': {
      'src': [srcRoot + '/fonts/**/*',fontAwesome + '/fonts/*', openSans + '/fonts/**/*'],
      'dest': targetRoot + '/fonts'
    },

    'gzip': {
      'src': targetRoot + '/**/*.{html,json,css,js,css.map,js.map}',
      'dest': targetRoot + '/'
    },

    'current_version': {
        'src': srcRoot + '/*.rar',
        'dest': targetRoot
    },

    'dist': {
        'root': targetRoot
    }
};

gulp.task('clean', function () {
    return del([config.dist.root + '/**/*']);
});

gulp.task('styles', function () {
    return gulp.src(config.styles.src)
        .pipe(sass({
            sourceComments: true,
            includePaths:  config.styles.sassIncludePaths.concat(jeet),
            outputStyle: 'nested'
        }).on('error', sass.logError))
        .pipe(concatCss(config.styles.bundleName, {includePaths: config.styles.cssIncludePaths}))
        .pipe(autoprefixer('last 3 versions', '> 1%', 'ie 9'))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.styles.dest))
        .pipe(browserSync.stream({once: true}));
});

/* For crrent version copy of StyleGuide */

gulp.task('current_version', function() {
  return gulp.src(config.current_version.src)
    .pipe(gulp.dest(config.current_version.dest));
});

/**/

gulp.task('fonts', function () {
  return gulp.src(config.fonts.src)
    .pipe(changed(config.fonts.dest))
    .pipe(gulp.dest(config.fonts.dest))
    .pipe(browserSync.stream({ once: true }));
});

gulp.task('images', function () {
  return gulp.src(config.images.src)
    .pipe(changed(config.images.dest))
    .pipe(gulp.dest(config.images.dest))
    .pipe(browserSync.stream({once: true}));
});

gulp.task('plugins', function () {
  return gulp.src(config.plugins.src)
    .pipe(changed(config.plugins.dest))
    .pipe(gulp.dest(config.plugins.dest))
    .pipe(browserSync.stream({once: true}));
});

gulp.task('scripts', function () {

    var customOpts = {
        entries: config.scripts.src,
        debug: true,
        fullPaths: true
    };

    var opts = _.assign({}, watchify.args, customOpts);

    var bundler = browserify(opts);

    if (!isProduction) {
        bundler = watchify(bundler);
        bundler.on('update', rebundle); // on any dep update, runs the bundler
        bundler.on('log', gutil.log); // output build logs to terminal
    }

    // bundler.transform(babelify.configure({
    //     // Optional ignore regex - if any filenames **do** match this regex then
    //     // they aren't compiled
    //     ignore: /templates/,
    // }));
    bundler.transform(envify({
        NODE_ENV: isProduction ? 'production' : 'development'
    }));

    function rebundle() {

        console.log('rebundle js...');

        return bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source(config.scripts.bundleName))
            .pipe(buffer())
            .pipe(gulpif(isProduction, uglify({mangle: false})))
            .pipe(gulp.dest(config.scripts.dest))
            .pipe(browserSync.stream({once: true}));
    }

    return rebundle();
});

gulp.task('index', function () {
    return gulp.src(config.index.src)
        .pipe(rigger())
        .pipe(gulp.dest(config.index.dest))
        .pipe(browserSync.stream({once: true}));
});

gulp.task('views', function () {
  return gulp.src(config.views.src)
    .pipe(rigger())
    .pipe(changed(config.views.dest))
    .pipe(gulp.dest(config.views.dest))
    .pipe(browserSync.stream({once: true}));
});

gulp.task('gzip', function () {
    return gulp.src(config.gzip.src)
        .pipe(tar('style_guide_0.0.5.tar'))
        .pipe(gzip())
        .pipe(gulp.dest(config.gzip.dest));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: config.dist.root
        },
        port: 3333,
        notify: false,
        ghostMode: {
            clicks: false,
            forms: false,
            scroll: false
        }
    });
});

gulp.task('watch', ['serve'], function () {
    gulp.watch(config.styles.watch, ['styles']);
    gulp.watch(config.index.src, ['index']);
    gulp.watch(config.views.src, ['views']);
    gulp.watch(config.images.src, ['images']);
    gulp.watch(config.fonts.src, ['fonts']);
});

gulp.task('dev', ['clean'], function (cb) {
    isProduction = false;
    cb = cb || function () {
        };
    runSequence(['styles', 'images', 'plugins', 'index', 'views', 'current_version','fonts'], 'scripts', 'watch', cb);
});

gulp.task('prod', ['clean'], function (cb) {
    isProduction = true;
    cb = cb || function () {
        };
    runSequence(['styles', 'images', 'plugins', 'index', 'views', 'current_version', 'fonts'], 'scripts', cb);
});
