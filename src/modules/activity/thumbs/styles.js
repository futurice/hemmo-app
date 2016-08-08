import {
  StyleSheet,
  Dimensions
} from 'react-native';

var height = Dimensions.get('window').height;

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
    height: height * 0.9,
    width: height + 10,
    flexDirection: 'column'
  },
  rightColumn: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  actionRow: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  voteButton: {
    margin: 15
  }
});

module.exports = styles;
