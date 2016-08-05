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
  emotionColumn: {
    flex: 4,
    paddingVertical: 20,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  check: {
    position: 'absolute',
    height: 30,
    width: 30,
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
    margin: 4,
    height: 105,
    width: 105
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
