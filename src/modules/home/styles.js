import {
  StyleSheet
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  userRow: {
    borderWidth: 1,
    width: 120,
    backgroundColor: '#dedede',
    alignItems: 'center',
    margin: 5
  },
  icon: {
    height: 110,
    width: 120,
    borderWidth: 10
  },
  nameLabel: {
    flexDirection: 'row'
  },
  settingsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  name: {
    fontSize: 20
  },
  button: {
    color: 'green'
  },
  emptyRow: {
    flexDirection: 'column',
    width: 150,
    borderWidth: 1,
    alignItems: 'center'
  }
});

module.exports = styles;
