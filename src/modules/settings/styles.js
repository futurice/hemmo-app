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
  changeImageButton: {
    backgroundColor: '#c2c2c2',
    borderRadius: 10,
    width: 100,
    marginLeft: 10
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  save_touchable: {
    height: 120,
    width: 120,
    borderRadius: 60,
    justifyContent: 'center'
  },
  cancelbutton: {
    backgroundColor: '#c2c2c2',
    borderRadius: 10,
    width: 100,
    marginLeft: 10,
    marginBottom: 20
  },
  buttonHighlight: {
    flex: 2,
    borderRadius: 10
  },
  removebutton: {
    backgroundColor: '#c42b08',
    borderRadius: 10,
    marginLeft: 10,
    width: 100
  }
});

module.exports = styles;
