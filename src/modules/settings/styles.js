import {
  StyleSheet
} from 'react-native';

// TODO: Fix positioning and buttons
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
  fieldcolumn: {
    flex: 1,
    flexDirection: 'column'
  },
  buttoncolumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  field: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 15
  },
  buttonfield: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    textAlign: 'center',
    fontSize: 20
  },
  input: {
    textAlign: 'center',
    fontSize: 20
  },
  touchable: {
    borderRadius: 60
  },
  highlight: {
    color: '#F5FCFF'
  },
  savebutton: {
    backgroundColor: 'green',
    borderRadius: 60,
    height: 120,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  cancelbutton: {
    backgroundColor: 'grey',
    borderRadius: 20,
    height: 30,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagefield: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 100,
    width: 100
  }
});

module.exports = styles;
