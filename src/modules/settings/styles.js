import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  form: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10
  },
  leftColumn: {
    flex: 2,
    flexDirection: 'column'
  },
  rightColumn: {
    flex: 1,
    flexDirection: 'column'
  },
  inputField: {
    flex: 1,
    alignItems: 'center'
  },
  label: {
    textAlign: 'center',
    fontSize: 20
  },
  input: {
    textAlign: 'center',
    fontSize: 20,
    flex: 1,
    borderWidth: 1
  },
  imagefield: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 120,
    width: 120
  },
  touchable: {
    borderRadius: 60,
    marginLeft: 20,
    marginBottom: 20
  },
  changeImageButton: {
    backgroundColor: '#c2c2c2',
    borderRadius: 10,
    width: 100
  },
  highlight: {
    color: '#F5FCFF'
  },
  buttonfield: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  savebutton: {
    backgroundColor: 'green',
    borderRadius: 60,
    height: 120,
    width: 120,
    justifyContent: 'center'
  },
  cancelbutton: {
    backgroundColor: '#c2c2c2',
    borderRadius: 10,
    width: 100
  },
  removebutton: {
    backgroundColor: '#c42b08',
    borderRadius: 10,
    width: 100
  }
});

module.exports = styles;
