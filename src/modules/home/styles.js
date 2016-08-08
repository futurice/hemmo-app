import {
  StyleSheet,
  Dimensions
} from 'react-native';

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: null,
    width: null
  },
  leftcolumn: {
    flex: 1
  },
  rightcolumn: {
    flex: 1,
    alignItems: 'center'
  },
  userRow: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userRowWithoutImage: {
    flex: 1,
    width: width * 0.5,
    margin: 5,
    marginRight: 20,
    borderWidth: 2,
    justifyContent: 'center',
    backgroundColor: '#dedede',
    alignItems: 'center'
  },
  name: {
    fontSize: 25
  },
  settingsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10
  }
});

module.exports = styles;
