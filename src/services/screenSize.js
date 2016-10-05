import {
  Dimensions
} from 'react-native';

export function getScreenHeight() {

  var height = Dimensions.get('window').height;
  var width = Dimensions.get('window').width;

  return height < width ? height : width;
}

export function getScreenWidth() {
  var height = Dimensions.get('window').height;
  var width = Dimensions.get('window').width;

  return width > height ? width : height;}
