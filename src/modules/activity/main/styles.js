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
  highlight: {
    margin: 10
  },
  hemmo: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  other: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20
  }
});

module.exports = styles;
