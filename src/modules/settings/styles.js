import {
  StyleSheet,
  Platform
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  titleBar: {
    flexDirection: 'row'
  },
  titleBarSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBar: {
    flexDirection: 'row',
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10
  },
  tab: {
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabText: {
    width: 90,
    fontSize: 15
  },
  form: {
    height: null,
    width: null,
    flex: 5,
    flexDirection: 'row',
    position: 'absolute',
    top: 40,
    bottom: 40,
    right: 10,
    left: 10
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
    paddingTop: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    textAlign: 'center',
    flex: 2,
    fontSize: 20
  },
  textInputView: {
    alignItems: 'center',
    flex: 4
  },
  input: {
    textAlign: 'center',
    fontSize: 20,
    ...Platform.select({
      ios: {
        height: 40,
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: 'rgba(209, 209, 209, 0.59)'
      },
      android: {
        fontSize: 20
      }
    })
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
  buttonfield: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop: 50
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
  },
  backButton: {
    marginRight: 10
  }
});

module.exports = styles;
