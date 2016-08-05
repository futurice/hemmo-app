import {
  StyleSheet
} from 'react-native';

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
    height: 320,
    width: 370,
    flexDirection: 'column'
  },
  rightColumn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 10
  },
  hemmoRow: {
    flex: 3
  },
  headerWithoutTitles: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 50
  },
  extraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  writeButton: {
    width: 150,
    height: 30,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
    right: 20,
    borderWidth: 1,
    borderRadius: 10
  },
  writeButtonHighlight: {
    width: 150,
    height: 30,
    borderRadius: 10
  },
  skipButton: {
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 10
  },
  skipButtonHighlight: {
    flex: 1,
    borderRadius: 10
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
    textAlignVertical: 'top'
  },
  closeButton: {
    color: 'rgb(74, 79, 77)',
    position: 'absolute',
    top: 10,
    right: 15
  }
});

module.exports = styles;
