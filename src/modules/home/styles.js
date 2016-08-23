import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: null,
    width: null
  },
  leftcolumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  rowWithSmallImageTouchable: {
    margin: 2,
    backgroundColor: 'white'
  },
  rowWithSmallImage: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
    bottom: 5
  },
  name: {
    fontSize: 25,
    fontFamily: 'Gill Sans'
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
