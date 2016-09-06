import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  activity: {
    // flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  highlight: {
    flex: 1,
    margin: 10
  },
  activityImage: {
    flex: 1
  },
  hemmo: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  text: {
    position: 'absolute',
    bottom: 5,
    left: 70,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Gill Sans'
  }
});

module.exports = styles;
