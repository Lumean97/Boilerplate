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

gulp.task('watch', function () {
	var args = merge(watchify.args, { debug: true });
	var bundler = watchify(browserify('./src/main.js', args)).transform(babelify, { presets: ['es2015'] });
	bundle_js(bundler);

	bundler.on('update', function () {
		bundle_js(bundler)
	});
});

// Without watchify
gulp.task('build', function () {
	var bundler = browserify('./src/main.js', { debug: true }).transform(babelify, { presets: ['es2015'] });

	return bundle_js(bundler);
});

// Without sourcemaps
gulp.task('build-production', function () {
	var bundler = browserify('./src/main.js').transform(babelify, { presets: ['es2015'] });

	return bundler.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);

function bundle_js(bundler) {
	return bundler.bundle()
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
