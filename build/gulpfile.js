'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let args = require('get-gulp-args')();

let config = {
	sass: {
		src: '../scss/',
		dest: '../css/'
	},
	js: {
		src: '../js/'
	}
};

let WATCH_SRC = args[0];

gulp.task('css:min', () => {
	return gulp.src(config.sass.src + `${WATCH_SRC}` + '/**/*.scss')
		.pipe(sass({
            sourceComments: 'map',
            outputStyle: 'nested'
        }).on('error', sass.logError))
		.pipe(gulp.dest(config.sass.dest + `${WATCH_SRC}`));
});

gulp.task('sass', function(){
    //sass()方法用于转换sass到css
  return gulp.src('../scss/' + `${WATCH_SRC}` + '/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('../css/' + `${WATCH_SRC}`))
});

//Watching Sass files for changes
gulp.task('watch', function(){
  gulp.watch(config.sass.src + `${WATCH_SRC}` + '/**/*.scss', ['sass']); 
  // Other watchers
})

//test
gulp.task('test', function () {
	gulp.src(config.js.src + '/**/*.js')
		.pipe(gulp.dest(config.sass.dest));
});