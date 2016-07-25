import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center'
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
    top: 0,
    right: 10
  },
  hemmoColumn: {
    flex: 1,
    justifyContent: 'center'
  },
  emotion: {
    borderWidth: 1,
    backgroundColor: 'rgba(180, 180, 180, 0.66)',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 100,
    width: 100
  },
  highlight: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 100,
    width: 100
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderWidth: 1,
    borderRadius: 10
  },
  buttonHighlight: {
    paddingHorizontal: 10,
    borderRadius: 10
  }
});

module.exports = styles;
