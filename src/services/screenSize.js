import { Dimensions } from 'react-native';

export function getScreenHeight() {
  return Dimensions.get('window').height;
}

export function getScreenWidth() {
  return Dimensions.get('window').width;
}
