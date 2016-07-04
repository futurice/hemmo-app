import {
  StyleSheet
} from 'react-native';

const circle = {
  borderWidth: 0,
  borderRadius: 60,
  width: 60,
  height: 60
};

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
    width: 150,
    backgroundColor: '#dedede',
    alignItems: 'center',
    margin: 5
  },
  icon: {
    height: 110,
    width: 150,
    borderWidth: 10
  },
  nameLabel: {
    flexDirection: 'row'
  },
  settingsButton: {
    ...circle,
    backgroundColor: 'green',
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
    color: 'white',
    fontSize: 20,
    borderWidth: 1,
    textAlign: 'center'
  }
});

module.exports = styles;
