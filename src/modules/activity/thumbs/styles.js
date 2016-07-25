import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    flex: 1
  },
  leftColumn: {
    flex: 3,
    flexDirection: 'column'
  },
  rightColumn: {
    flex: 2,
    flexDirection: 'column'
  },
  hemmoRow: {
    flex: 3
  },
  titleRow: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  mainTitle: {
    fontSize: 20
  },
  subTitle: {
    fontSize: 10
  },
  actionRow: {
    flex: 2,
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  voteButton: {
    margin: 15
  }
});

module.exports = styles;
