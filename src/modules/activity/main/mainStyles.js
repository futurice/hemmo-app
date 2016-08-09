import {getScreenWidth, getScreenHeight} from '../../../services/screenSize';
import {
  StyleSheet
} from 'react-native';

var w = getScreenWidth();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  activity: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  highlight: {
    flex: 1,
    padding: 10,
    flexWrap: 'wrap'
  },
  activityImage: {
    flex: 1
  },
  hemmo: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  text: {
    position: 'absolute',
    bottom: 5,
    left: 70,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Gill Sans'
  }
});

module.exports = styles;
