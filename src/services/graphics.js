import { getScreenHeight, getScreenWidth } from './screenSize';

const graphics = require('../data/graphics.js');

export function getSizeByHeight(name, size) {
  const ratio = graphics[name].ratio;
  const screenHeight = getScreenHeight();
  const height = screenHeight * size;
  const width = height * ratio;

  return { height, width };
}

export function getSizeByWidth(name, size) {
  const ratio = graphics[name].ratio;
  const screenWidth = Math.min(getScreenWidth(), getScreenHeight());
  const width = screenWidth * size;
  const height = width / ratio;

  return { height, width };
}

export function getImage(name) {
  return graphics[name];
}

export function getFontSize(f) {
  const height = getScreenHeight();
  const width = getScreenWidth();

  return Math.sqrt(height * height + width * width) * (f / 100);
}
