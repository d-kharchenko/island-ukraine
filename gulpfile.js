var gulp = require('gulp');
// var concat = require('gulp-concat');
// var sass = require('gulp-ruby-sass');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var server = require('gulp-server-livereload');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');


 gulp.task('concat', function () {
     return gulp.src([
        'src/css/uikit.min.css',
        'src/css/main.css',
        'src/css/mobile.css',
        'src/css/table.css'
         ])
         .pipe(concat('app.css'))
         .pipe(gulp.dest('dist/css'));

 });
gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css'));
});

gulp.task('js', function() {
    gulp.src([
        'src/js/component.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('js_v', function() {
    gulp.src([
            'src/js/vendor/uikit.min.js',
            'src/js/vendor/uikit-icons.min.js',
        ])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function(){
    return gulp.src([
        'src/img/**/*.png',
        'src/img/**/*.jpg'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

// gulp.task('images_css', function(){
//     return gulp.src('src/sass/info/images/**/*.*')
//         .pipe(cache(imagemin()))
//         .pipe(gulp.dest('dist/css/images'))
// });

gulp.task('pages', function(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});
gulp.task('login', function(){
    return gulp.src('src/login/*.html')
        .pipe(gulp.dest('dist/login'));
});
gulp.task('allpages', function(){
    return gulp.src('src/pages/**/*.html')
        .pipe(gulp.dest('dist/pages'));
});
// gulp.task('uncss', function () {
//     return gulp.src('dist/css/app.css')
//         .pipe(uncss({
//             html: ['dist/*.html']
//         }))
//         .pipe(gulp.dest('dist/css'));
// });

gulp.task('webserver', function() {
    gulp.src('dist')
        .pipe(server({
            livereload: {
                enable: true,
                filter: function(filePath, cb) {
                    cb( !(/.DS_Store/.test(filePath)) );
                }
            },
            directoryListing: false,
            open: true,
            log: 'info',
            defaultFile: 'index.html'
        }));
});

gulp.task('default', function() {
    gulp.start('pages', 'js', 'js_v', 'sass', 'concat', 'images', 'webserver', 'login', 'allpages');
    gulp.watch('src/*.html', ['pages']);
    gulp.watch('src/pages/**/*.html', ['allpages']);
    gulp.watch('src/js/*.js', ['js']); 
    gulp.watch('src/js/vendor/*.js', ['js_v']);
    gulp.watch('src/css/**/*.css', ['concat']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/images/**/*.*', ['images']);
    gulp.watch('src/login/*.html', ['login']);
});