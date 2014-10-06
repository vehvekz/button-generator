var gulp = require('gulp'),
		concatCSS = require('gulp-concat-css'),
		concat = require('gulp-concat'),
		minifyCSS = require('gulp-minify-css'),
		autoprefixer = require('gulp-autoprefixer'),
		rename = require('gulp-rename'),
		uglify = require('gulp-uglify');

//task css
gulp.task('css', function () {
	gulp.src('src/css/*.css')
		.pipe(concatCSS('build.css'))
		.pipe(autoprefixer({
						browsers: ['last 3 versions'],
						cascade: false
				}))
		.pipe(minifyCSS())
		.pipe(rename('build.min.css'))
		.pipe(gulp.dest('dest/css/'))
});

//html task
gulp.task('html', function () {
	gulp.src('index.html')
});

//JS Task
gulp.task('js', function() {
	gulp.src('src/js/*.js')
			.pipe(concat('build.js'))
			.pipe(uglify())
			.pipe(rename('build.min.js'))
			.pipe(gulp.dest('dest/js/'))
	gulp.src('src/vendors/*.js')
		.pipe(concat('vendors.js'))
		.pipe(uglify())
		.pipe(rename('vendors.min.js'))
		.pipe(gulp.dest('dest/vendors/'))
});

//task watch
gulp.task('watch', function(){
	gulp.watch('src/css/*.css', ['css'])
	gulp.watch('index.html', ['html'])
	gulp.watch('src/js/*.js', ['js'])
});

//task default
gulp.task('default', ['html', 'css', 'js', 'watch']);