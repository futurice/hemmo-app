import {getScreenWidth, getScreenHeight} from './screenSize';
var graphics = require('../components/graphics.js');

export function getSize(name) {
  var ratio = graphics.get(name).get('ratio');
  var height = getScreenHeight() * 0.9;
  var width = height * ratio;

  return {height, width};
}

export function getImage(name) {
  return graphics.get(name).get('image');
}
