import React, {PropTypes} from 'react';
import {View, StyleSheet, AppState, Dimensions} from 'react-native';
import NavigationViewContainer from './navigation/NavigationViewContainer';
import AppRouter from './AppRouter';
import Spinner from 'react-native-gifted-spinner';
import * as snapshotUtil from '../utils/snapshot';
import * as NavigationState from '../modules/navigation/NavigationState';
import * as SessionState from '../modules/session/SessionState';
import store from '../redux/store';

import Orientation from 'react-native-orientation';

const AppView = React.createClass({
  propTypes: {
    isReady: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      currentState: AppState.currentState,
      previousState: null
    };
  },

  componentDidMount() {
    Orientation.lockToLandscape();
    // this.setScreenSize();
    AppState.addEventListener('change', this._handleAppStateChange);

    /* Haetaan viimeisin tila */
    snapshotUtil.resetSnapshot()
      .then(snapshot => {
        const {dispatch} = this.props;

        /* Jos viimeisin tila löytyi */
        if (snapshot) {
          dispatch(SessionState.resetSessionStateFromSnapshot(snapshot));
            // .then(this.resetRoute());
        }
        /* Ei löytynyt. Aloitetaan alusta */
        else {
          dispatch(SessionState.initializeSessionState());
        }

        /* Tallennetaan uusin tila aina kun statea päivitetään */
        store.subscribe(() => {
          snapshotUtil.saveSnapshot(store.getState());
        });
      });
  },

  _handleAppStateChange() {
    if (AppState.currentState === 'active') {
      Orientation.lockToLandscape();
    }
  },

  // setScreenSize() {
  //   var height = Dimensions.get('window').height;
  //   var width = Dimensions.get('window').width;
  //
  //   console.log('screen height ' + height + ' and width ' + width);
  // },

  resetRoute() {
    this.props.dispatch(NavigationState.resetRoute());
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
