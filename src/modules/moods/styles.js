import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    height: null,
    width: null
  },
  moodContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 30,
    height: null,
    width: null
  },
  font: {
    fontSize: 20,
    fontFamily: 'Gill Sans'
  },
  moodColumn: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  check: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  hemmoColumn: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mood: {
    margin: 5
  },
  hemmo: {
    position: 'absolute',
    bottom: 20,
    right: 0
  },
  other: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveButton: {
    position: 'absolute',
    bottom: 10,
    right: 140
  }
});

module.exports = styles;
