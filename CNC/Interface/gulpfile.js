const gulp = require('gulp');

const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const merge = require('utils-merge');

const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

const gutil = require('gulp-util');
const chalk = require('chalk');

function map_error(err) {
	if (err.fileName) {
		// regular error
		gutil.log(chalk.red(err.name)
			+ ': '
			+ chalk.yellow(err.fileName.replace(__dirname + '/src/', ''))
			+ ': '
			+ 'Line '
			+ chalk.magenta(err.lineNumber)
			+ ' & '
			+ 'Column '
			+ chalk.magenta(err.columnNumber || err.column)
			+ ': '
			+ chalk.blue(err.description));
	} else {
		// browserify error..
		gutil.log(chalk.red(err.name)
			+ ': '
			+ chalk.yellow(err.message));
	}
}

gulp.task('watchify', function () {
	var args = merge(watchify.args, { debug: true });
	var bundler = watchify(browserify('./src/main.js', args)).transform(babelify, { presets: ['es2015'] });
	bundle_js(bundler);

	bundler.on('update', function () {
		bundle_js(bundler)
	});
});

function bundle_js(bundler) {
	return bundler.bundle()
		.on('error', map_error)
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(gulp.dest('dist'))
		.pipe(rename('app.min.js'))
		.pipe(sourcemaps.init({ loadMaps: true }))
		// capture sourcemaps from transforms
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
}

// Without watchify
gulp.task('browserify', function () {
	var bundler = browserify('./src/main.js', { debug: true }).transform(babelify, {/* options */ });

	return bundle_js(bundler);
});

// Without sourcemaps
gulp.task('browserify-production', function () {
	var bundler = browserify('./src/main.js').transform(babelify, {/* options */ });

	return bundler.bundle()
		.on('error', map_error)
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});
