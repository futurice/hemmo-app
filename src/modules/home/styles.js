import {
  StyleSheet,
  Dimensions
} from 'react-native';

const height = Dimensions.get('window').height / 2 - 20;
const width = height * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
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
    height,
    width,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userRowWithoutImage: {
    flex: 1,
    width: 300,
    margin: 5,
    borderWidth: 2,
    justifyContent: 'center',
    backgroundColor: '#dedede',
    alignItems: 'center'
  },
  icon: {
    height: width - 15,
    width: width - 15
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
