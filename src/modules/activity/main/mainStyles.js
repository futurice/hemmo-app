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
    margin: 15,
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
    margin: 7,
    alignItems: 'center'
  },
  hemmoImage: {
    flex: 1
  },
  text: {
    fontSize: 15
  }
});

module.exports = styles;
