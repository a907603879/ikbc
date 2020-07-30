const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin')

gulp.task('html-copy', function () {
    return gulp.src('*.html')
        .pipe(htmlmin({
            removeEmptyAttibutes: true, // 移出所有空属性
            collapseWhitespace: true // 压缩 html
        }))
        .pipe(gulp.dest('dist/')).pipe(connect.reload())
})

gulp.task('images', function () {
    return gulp.src('images/*.{jpg,png}')
        .pipe(gulp.dest('dist/images')).pipe(connect.reload());
})

gulp.task('script', function () {
    return gulp.src(['js/*.js'])
        .pipe(gulp.dest("dist/js")).pipe(connect.reload());
})

gulp.task("data", function () {
    return gulp.src(["js/*.json"]).pipe(gulp.dest("dist/data")).pipe(connect.reload());
})

const scss = require('gulp-sass');
const minifyCSS = require('gulp-minify-css');
const rename = require('gulp-rename');
gulp.task('scssInfuse', function () {
    return gulp.src('stylesheet/infuse.scss')
        .pipe(scss())
        .pipe(gulp.dest('dist/css'))
        .pipe(minifyCSS())
        .pipe(rename('infuse.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})
gulp.task('scssIndex', function () {
    return gulp.src('stylesheet/index.scss')
        .pipe(scss())
        .pipe(gulp.dest('dist/css'))
        .pipe(minifyCSS())
        .pipe(rename('index.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})
gulp.task('scssList', function () {
    return gulp.src('stylesheet/list.scss')
        .pipe(scss())
        .pipe(gulp.dest('dist/css'))
        .pipe(minifyCSS())
        .pipe(rename('list.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})
gulp.task('scssDetail', function () {
    return gulp.src('stylesheet/detail.scss')
        .pipe(scss())
        .pipe(gulp.dest('dist/css'))
        .pipe(minifyCSS())
        .pipe(rename('detail.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})
gulp.task('scssShopping', function () {
    return gulp.src('stylesheet/shopping.scss')
        .pipe(scss())
        .pipe(gulp.dest('dist/css'))
        .pipe(minifyCSS())
        .pipe(rename('shopping.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})

gulp.task('bulid', ['html-copy', 'images', 'script', "data", 'scssInfuse', 'scssIndex', 'scssList', 'scssDetail','scssShopping'], function () {
    console.log("项目建立成功")
})


gulp.task('watch', function () {
    gulp.watch('*.html', ['html-copy']);
    gulp.watch('images/*.{jpg,png}', ['images']);
    gulp.watch('js/*.js', ['script']);
    gulp.watch('js/*.json', ['data']);
    gulp.watch('stylesheet/infuse.scss', ['scssInfuse']);
    gulp.watch('stylesheet/index.scss', ['scssIndex']);
    gulp.watch('stylesheet/list.scss', ['scssList']);
    gulp.watch('stylesheet/detail.scss', ['scssDetail']);
    gulp.watch('stylesheet/shopping.scss', ['scssShopping']);
})

const connect = require('gulp-connect');
gulp.task('server', function () {
    connect.server({
        root: 'dist',
        port: 2222,
        livereload: true,
    })
})

gulp.task('default', ['watch', 'server'])