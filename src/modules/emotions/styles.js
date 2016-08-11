import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    height: null,
    width: null
  },
  emotionContainer: {
    flex: 1,
    flexDirection: 'row',
    height: null,
    width: null
  },
  font: {
    fontFamily: 'Gill Sans'
  },
  emotionColumn: {
    flex: 4,
    paddingLeft: 20,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  check: {
    position: 'absolute',
    top: 0,
    right: 10
  },
  hemmoColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emotion: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  highlight: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    margin: 6
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  buttonHighlight: {
    paddingHorizontal: 10,
    borderRadius: 10
  }
});

module.exports = styles;
