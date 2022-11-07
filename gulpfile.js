const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const svgSprite = require('gulp-svg-sprite');
const config = {
  mode: {
    stack: {
        sprite: "../sprite.svg"
    }
},
};
const browserSync = require('browser-sync').create();

const browserSyncJob = () => {
  browserSync.init({
    server: "build/"
  });

  watch('app/scss/**/*.scss', buildCss);
  watch('app/pug/**/*.pug', buildHtml);
};

const makeSpriteSvg = () => {
	return src('app/imgs/icons/*.svg')
    .pipe(svgSprite(config))
    .pipe(dest('build/imgs/sprite'))
}

const copyImgs = () => {
	return src('app/imgs/**/*.jpg')
	  .pipe(dest('build/imgs'))
}

const buildCss = () => {
  console.log('Компиляция SASS');

  return src('app/scss/*.scss')
    .pipe(sass({ sourceMap: false }))
    .pipe(cleanCSS())
    .pipe(concat('style.css'))
    .pipe(dest('build/styles/'))
    .pipe(browserSync.stream());
}

const buildHtml = () => {
  console.log('Компиляция Pug');

  return src('app/pug/*.pug')
    .pipe(pug())
    .pipe(dest('build/'))
    .pipe(browserSync.stream());
}

exports.server = browserSyncJob;
exports.build = series(copyImgs, makeSpriteSvg, buildCss, buildHtml);
exports.develop = series(copyImgs, makeSpriteSvg, buildCss, buildHtml, browserSyncJob);