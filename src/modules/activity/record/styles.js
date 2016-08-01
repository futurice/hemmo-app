import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    flex: 1
  },
  leftColumn: {
    flex: 3,
    flexDirection: 'column'
  },
  rightColumn: {
    flex: 2,
    flexDirection: 'column'
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
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10
  },
  writeButtonHighlight: {
    flex: 2,
    borderRadius: 10
  },
  skipButton: {
    flex: 1,
    borderWidth: 1,
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
