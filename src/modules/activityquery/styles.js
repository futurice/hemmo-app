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
    borderWidth: 4,
    borderColor: 'gray',
    margin: 15,
    padding: 25,
    borderRadius: 10,
    alignItems: 'center'
  },
  activityImage: {
    flex: 1
  },
  hemmo: {
    flex: 1,
    margin: 7,
    alignItems: 'center'
  }
});

module.exports = styles;
