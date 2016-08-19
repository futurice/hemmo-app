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
    // flex: 1,
    width: width * 0.4,
    margin: 5,
    marginRight: 20,
    borderWidth: 2,
    backgroundColor: 'white'
  },
  rowWithSmallImage: {
    flex: 1,
    flexDirection: 'row',
    width: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallIcon: {
    position: 'absolute',
    top: 2,
    left: 2,
    bottom: 2
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
