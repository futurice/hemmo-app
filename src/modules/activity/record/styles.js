import {
  StyleSheet,
  Dimensions
} from 'react-native';

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    flex: 1,
    width: null,
    height: null
  },
  leftColumn: {
    marginTop: 10,
    margin: 10,
    flexDirection: 'column'
  },
  buttonRow: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 20,
    paddingBottom: 20
  },
  rightColumn: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40
  },
  headerWithoutTitles: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 100
  },
  hemmoRow: {
    flex: 6,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  extraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  skipRow: {
    flex: 1
  },
  skipButtonHighlight: {
    flex: 1,
    width: width / 8,
    borderRadius: 10,
    position: 'absolute',
    right: 20,
    bottom: 10
  },
  returnButton: {
    margin: 30,
    marginLeft: 50
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});

module.exports = styles;
