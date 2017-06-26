import {
  Dimensions,
} from 'react-native';

export function getScreenHeight() {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  return height < width ? height : width;
}

export function getScreenWidth() {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  return width > height ? width : height;
}
