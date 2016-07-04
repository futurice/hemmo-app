import {
  StyleSheet,
  Dimensions
} from 'react-native';

const circle = {
  borderWidth: 0,
  borderRadius: 60,
  width: 60,
  height: 60
};

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  leftcolumn: {
    flex: 1
  },
  rightcolumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  userRow: {
    borderWidth: 1,
    width: width * 0.4,
    alignItems: 'center',
    margin: 5
  },
  icon: {
    height: height * 0.17,
    width: width * 0.4,
    borderWidth: 10
  },
  nameLabel: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  settingsButton: {
    ...circle,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  nameList: {
    fontSize: 5
  },
  button: {
    color: 'white',
    fontSize: 20,
    borderWidth: 1,
    textAlign: 'center'
  }
});

module.exports = styles;
