import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  titleBar: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  titleBarSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgb(214, 214, 214)',
    borderWidth: 1,
    position: 'absolute',
    borderBottomColor: 'white',
    top: 40,
    left: 30,
    right: 30
  },
  form: {
    borderWidth: 1,
    flex: 5,
    flexDirection: 'row',
    position: 'absolute',
    top: 70,
    left: 10,
    right: 10,
    bottom: 10
  },
  leftColumn: {
    flex: 5,
    flexDirection: 'column'
  },
  rightColumn: {
    flex: 3,
    flexDirection: 'column'
  },
  inputField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    textAlign: 'center',
    flex: 2,
    fontSize: 20
  },
  input: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    borderRadius: 10,
    flex: 4
  },
  imagefield: {
    flex: 3,
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
    width: 140,
    marginLeft: 10
  },
  changeImageHighlight: {
    padding: 10,
    borderRadius: 10
  },
  buttonfield: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomRow: {
    flexDirection: 'row'
  },
  savebutton: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  save_touchable: {
    borderRadius: 10,
    justifyContent: 'center'
  },
  cancelbutton: {
    borderRadius: 10,
    width: 100
  },
  buttonHighlight: {
    flex: 2,
    borderRadius: 10
  },
  removebutton: {
    borderRadius: 10,
    width: 100
  }
});

module.exports = styles;
