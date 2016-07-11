import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1
  },
  leftColumn: {
    flex: 3,
    flexDirection: 'column',
    borderWidth: 1
  },
  titleRow: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    alignItems: 'center'
  },
  mainTitle: {
    fontSize: 20
  },
  subTitle: {
    fontSize: 10
  },
  actionRow: {
    flex: 1,
    borderWidth: 1
  },
  rightColumn: {
    flex: 2,
    flexDirection: 'column',
    borderWidth: 1
  },
  hemmoRow: {
    flex: 2,
    borderWidth: 1
  },
  extraRow: {
    flex: 1,
    borderWidth: 1
  }
});

module.exports = styles;
