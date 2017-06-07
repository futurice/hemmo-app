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
  leftColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightColumn: {
    flex: 1,
    alignItems: 'center'
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
