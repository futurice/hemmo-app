import React, {PropTypes} from 'react';
import {View, StyleSheet} from 'react-native';
import NavigationViewContainer from './navigation/NavigationViewContainer';
import AppRouter from './AppRouter';
import Spinner from 'react-native-gifted-spinner';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/session/SessionState';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';


import Orientation from 'react-native-orientation';

const AppView = React.createClass({
  propTypes: {
    isReady: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  },
  componentDidMount() {

    Orientation.lockToLandscape();


    snapshotUtil.resetSnapshot()
      .then(snapshot => {
        const {dispatch} = this.props;

        if (snapshot) {
          dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
        } else {
          dispatch(SessionStateActions.initializeSessionState());
        }
      });
  },

  render() {
    if (!this.props.isReady) {
      return (
        <View style={styles.centered}>
          <Spinner />
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <NavigationViewContainer router={AppRouter} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default AppView;
