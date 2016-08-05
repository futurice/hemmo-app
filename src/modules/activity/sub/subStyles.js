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

    // backgroundColor: 'rgba(233, 233, 233, 0.93)',
    // borderWidth: 2,
    // borderRadius: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  titleBar: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    fontSize: 20
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
    backgroundColor: 'white'
  },
  activityFont: {
    textAlign: 'center'
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
