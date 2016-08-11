import {getScreenHeight} from './screenSize';
var graphics = require('../components/graphics.js');

export function getSize(name, size) {

  var ratio = graphics.get(name).get('ratio');
  var height = getScreenHeight() * size;
  var width = height * ratio;

  return {height, width};
}

export function getImage(name) {
  return graphics.get(name).get('image');
}
