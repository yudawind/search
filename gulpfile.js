const { src, dest, watch, series } = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const paths = {
    css: 'less/**/*.less'
};

function css() {
    const processor = [
        autoprefixer({ overrideBrowserslist: ['last 2 versions'] }),
        cssnano()
    ];
    return src('less/template.less')
        .pipe(less())
        .pipe(postcss(processor))
        .pipe(rename('style.css'))
        .pipe(dest('www'));
}

function watcher() {
    watch(paths.css, css);
}

exports.css = css;
exports.default = series(css, watcher);
