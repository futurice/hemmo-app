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
