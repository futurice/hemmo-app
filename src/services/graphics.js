import {getScreenHeight, getScreenWidth} from './screenSize';
var graphics = require('../components/graphics.js');

export function getSizeByHeight(name, size) {

  var ratio = graphics.get(name).get('ratio');
  var height = getScreenHeight() * size;
  var width = height * ratio;

  return {height, width};
}

export function getSizeByWidth(name, size) {
  var ratio = graphics.get(name).get('ratio');
  var width = getScreenWidth() * size;
  var height = width / ratio;

  return {height, width};
}

export function getImage(name) {
  console.log('name ' + name);
  return graphics.get(name).get('image');
}
