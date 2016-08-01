import {
  StyleSheet,
  Platform
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  leftcolumn: {
    flex: 1
  },
  rightcolumn: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap'
    // alignItems: 'center'
  },
  userRow: {
    borderWidth: 1,
    width: 120,
    backgroundColor: '#dedede',
    alignItems: 'center',
    margin: 5
  },
  userRowWithoutImage: {
    flex: 1,
    width: 200,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: '#dedede',
    alignItems: 'center',
    margin: 5
  },
  emptyRow: {
    flexDirection: 'column',
    width: 150,
    borderWidth: 1,
    alignItems: 'center'
  },
  icon: {
    height: 110,
    width: 120,
    ...Platform.select({
      ios: {
        borderWidth: 4,
        borderColor: '#dedede'
      },
      android: {
        borderWidth: 10
      }
    })
  },
  nameLabel: {
    flexDirection: 'row'
  },
  name: {
    fontSize: 20
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
