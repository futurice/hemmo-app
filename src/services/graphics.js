import { getScreenHeight, getScreenWidth } from './screenSize';

const graphics = require('../data/graphics.js');

export function getSizeByHeight(name, size) {
  const ratio = graphics.get(name).get('ratio');
  const screenHeight = getScreenHeight();
  const height = screenHeight * size;
  const width = height * ratio;

  return { height, width };
}

export function getSizeByWidth(name, size) {
  const ratio = graphics.get(name).get('ratio');
  const screenWidth = getScreenWidth();
  const width = screenWidth * size;
  const height = width / ratio;

  return { height, width };
}

export function getImage(name) {
  return graphics.get(name).get('image');
}
