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
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  highlight: {
    flex: 1,
    padding: 10,
    flexWrap: 'wrap'
    // margin: 10,
    // borderRadius: 10
  },
  activityImage: {
    flex: 1
    // borderWidth: 4,
    // borderColor: 'gray',
    // borderRadius: 10
  },
  hemmo: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    position: 'absolute',
    top: 135,
    left: 70,
    fontSize: 20
  }
});

module.exports = styles;
