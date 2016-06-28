import {
  StyleSheet
} from 'react-native';

const circle = {
  borderWidth: 0,
  borderRadius: 60,
  width: 120,
  height: 120
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  column: {
    flex: 1,
    alignItems: 'center'
  },
  settingsButton: {
    ...circle,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  nameList: {
    fontSize: 5
  },
  button: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center'
  }
});

module.exports = styles;
