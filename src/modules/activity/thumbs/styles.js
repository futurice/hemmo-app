import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    flex: 1,
    width: null,
    height: null
  },
  leftColumn: {
    margin: 10,
    flexDirection: 'column'
  },
  rightColumn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40
  },
  actionRow: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  voteButton: {
    margin: 5
  }
});

module.exports = styles;
