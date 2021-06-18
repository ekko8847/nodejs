const { series, parallel } = require('gulp');
const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify')
const rename = require('gulp-rename');
const less = require('gulp-less')
const concat = require('gulp-concat')
const connect = require('gulp-connect');
const { exec } = require("child_process");
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin');

//使用task定义一个任务 规定任务名
gulp.task('babel', () =>
    gulp.src('./src/js/*js') //把某个文件夹的文件读取出来一个可读流
    .pipe(babel({
        //把ES6代码编译为ES5
        //把ES6模块化规范编译为CommonJS规范
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dist/js')) //把处理的流写入到某个文件夹
    .pipe(connect.reload())
)


// Basic usage
gulp.task('browserify', function() {
    // Single entry point to browserify
    return gulp.src('./dist/js/index.js')
        .pipe(browserify({
            insertGlobals: true,
        }))
        .pipe(rename('build.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload());
});
//less配置
gulp.task('less', function() {
    return gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});
//html配置
gulp.task("html", () => {
        return gulp.src("./src/index.html")
            .pipe(gulp.dest("./dist"))
            .pipe(connect.reload());
    })
    //配置服务器
gulp.task("connect", function() {
    // 创建一个服务器
    connect.server({
        port: 3000, // 端口号
        root: ["dist"], // 暴露目录
        livereload: true, // 自动刷新浏览器
    });
    //自动打开浏览器
    exec("start http://127.0.0.1:3000")
        // 自动监视 src/index.html 文件的变化，一旦文件发生变化就会执行后面
    gulp.watch("src/index.html", gulp.series(["html"]));
    gulp.watch("src/less/*.less", gulp.series(["less"]));
    gulp.watch("src/js/*.js", gulp.series(["js-dev"]));
});

gulp.task("uglify", function() {
    return gulp
        .src("./dist/js/build.js")
        .pipe(uglify())
        .pipe(rename("build.min.js"))
        .pipe(gulp.dest("./dist/js"))
})

gulp.task('cssmin', function() {
    return gulp.src('./dist/css/*.css')
        .pipe(cssmin())
        .pipe(rename("all.min.css"))
        .pipe(gulp.dest('./dist/css'));
});


gulp.task('htmlmin', () => {
    return gulp.src('./src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./dist'));
});
//统一js任务配置
gulp.task("js-dev", series(['babel', 'browserify']))
gulp.task("dev", parallel(['js-dev', 'html', 'less']))
gulp.task("watch", gulp.series(["dev", "connect"]));
gulp.task("js-prod", series(['js-dev', 'uglify']))
gulp.task("css-prod", series(['less', 'cssmin']))
gulp.task("build", parallel(['js-prod', 'css-prod', 'htmlmin']))