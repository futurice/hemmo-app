import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(184, 184, 184, 0.9)'
  },
  subActivityContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  titleBar: {
    flex: 1,
    margin: 15,
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    fontSize: 25,
    fontFamily: 'Gill Sans'
  },
  activityBar: {
    flex: 6,
    flexDirection: 'row'
  },
  activityBlock: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  subActivities: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hemmo: {
    flex: 1,
    paddingRight: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityCircle: {
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    margin: 5
  },
  activityFont: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Gill Sans'
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10
  }
});

module.exports = styles;
