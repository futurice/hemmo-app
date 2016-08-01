import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  activity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  highlight: {
    flex: 1,
    flexWrap: 'wrap',
    margin: 10,
    borderRadius: 10
  },
  activityImage: {
    flex: 1,
    borderWidth: 4,
    borderColor: 'gray',
    borderRadius: 10
  },
  hemmo: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    position: 'absolute',
    top: 140,
    left: 80,
    fontSize: 15
  }
});

module.exports = styles;
