import React, {PropTypes} from 'react';
import {View, StyleSheet, AppState, Platform, Alert} from 'react-native';
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

    // Alert.alert('Component did mount!', 'Mwahaha');
    Orientation.lockToLandscape();
    // if (Platform.OS === 'ios') {
    //   AppState.addEventListener('change', this._handleAppStateChange);
    // }
    // else if (Platform.OS === 'android') {
    //   console.log('android state changes still not implemented :< Sry! ');
    // }
    /* Haetaan viimeisin tila */
    snapshotUtil.resetSnapshot()
      .then(snapshot => {
        const {dispatch} = this.props;

        /* Jos viimeisin tila löytyi */
        if (snapshot) {
          // Alert.alert('Resetting snapshot', 'jee');
          dispatch(SessionState.resetSessionStateFromSnapshot(snapshot));
            // .then(this.resetRoute());
        }
        /* Ei löytynyt. Aloitetaan alusta */
        else {
          // Alert.alert('Init snapshot', 'jee');
          dispatch(SessionState.initializeSessionState());
        }

        /* Tallennetaan uusin tila aina kun statea päivitetään */
        store.subscribe(() => {
          snapshotUtil.saveSnapshot(store.getState());
        });
      });
  },

  resetRoute() {
    this.props.dispatch(NavigationState.resetRoute());
    // snapshotUtil.resetSnapshot()
    //   .then(snapshot => {
    //     const {dispatch} = this.props;
    //     if (snapshot) {
    //       dispatch(NavigationState.resetSessionStateFromSnapshot(snapshot));
    //     }
    //     else {
    //       dispatch(NavigationState.initializeSessionState());
    //     }
    //   });
  },

  /* IOS app state changes handled,
  expect for the situation when user closes app through open application menu */
  // _handleAppStateChange() {
  //   // console.log('App state changed!');
  //   // var previous = this.state.currentState;
  //   // this.setState({currentState: AppState.currentState, previous});
  //   if (AppState.currentState === 'background') {
  //     console.log('Closed the app!');
  //     // this.resetState();
  //   }
  // },

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
