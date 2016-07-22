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
  },
  recordRow: {
    flex: 2,
    marginLeft: 30,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonArea: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderRadius: 65,
    backgroundColor: 'rgb(240, 234, 234)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rec: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgb(246, 30, 30)'
  },
  recHighlight: {
    width: 90,
    height: 90,
    borderRadius: 45
  }
});

module.exports = styles;
