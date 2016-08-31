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
  rowWithSmallImageContainer: {
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
    left: 5
  },
  font: {
    fontSize: 20,
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
