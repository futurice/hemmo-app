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
  titleRow: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  mainTitle: {
    fontSize: 20
  },
  subTitle: {
    fontSize: 10
  },
  actionRow: {
    flex: 2,
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightColumn: {
    flex: 2,
    flexDirection: 'column'
  },
  hemmoRow: {
    flex: 3
  },
  extraRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  writeButton: {
    flex: 2,
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
    borderRadius: 10,
    marginHorizontal: 10
  },
  skipButtonHighlight: {
    flex: 1,
    borderRadius: 10
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center'
  },
  voteButton: {
    margin: 15
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
  closeButton: {
    color: 'rgb(74, 79, 77)',
    position: 'absolute',
    top: 10,
    right: 15
  },
  textForm: {
    margin: 15,
    textAlignVertical: 'top'
  }
});

module.exports = styles;
