import {getScreenHeight, getScreenWidth} from './screenSize';
var graphics = require('../data/graphics.js');

export function getSizeByHeight(name, size) {
  var ratio = graphics.get(name).get('ratio');
  var screenHeight = getScreenHeight();
  var height = screenHeight * size;
  var width = height * ratio;

  return {height, width};
}

export function getSizeByWidth(name, size) {
  var ratio = graphics.get(name).get('ratio');
  var screenWidth = getScreenWidth();
  var width = screenWidth * size;
  var height = width / ratio;

  return {height, width};
}

export function getImage(name) {
  return graphics.get(name).get('image');
}
