import {
  StyleSheet,
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
    backgroundColor: 'rgba(184, 184, 184, 0.9)',
  },
  subActivityContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  titleBar: {
    flex: 1,
    margin: 15,
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 25,
    fontFamily: 'Gill Sans',
  },
  activityBar: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subActivities: {
    flex: 3,
    marginLeft: 20,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  hemmo: {
    flex: 1,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

module.exports = styles;
