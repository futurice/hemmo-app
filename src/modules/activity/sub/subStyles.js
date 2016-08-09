import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
    width: null,
    height: null,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  titleBar: {
    flex: 1,
    margin: 15,
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    fontSize: 20,
    fontFamily: 'Gill Sans'
  },
  activityBar: {
    position: 'absolute',
    top: 20,
    left: 5
  },
  activityBlock: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityCircle: {
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10
  },
  activityFont: {
    textAlign: 'center',
    fontFamily: 'Gill Sans'
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 40,
    height: 40
  }
});

module.exports = styles;
