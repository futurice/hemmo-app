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
    flexDirection: 'column'
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
  writingContainer: {
    position: 'absolute',
    backgroundColor: 'rgb(177, 177, 177)',
    borderWidth: 2,
    borderRadius: 30,
    top: 20,
    left: 20,
    right: 20,
    bottom: 60,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 80
  },
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderWidth: 3,
    borderColor: 'gray',
    justifyContent: 'flex-start'
  },
  textForm: {
    margin: 15,
    flex: 1,
    fontSize: 20,
    textAlignVertical: 'top'
  },
  returnButton: {
    margin: 30
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});

module.exports = styles;
