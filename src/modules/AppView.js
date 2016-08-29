import React, {PropTypes} from 'react';
import {View, StyleSheet, AppState} from 'react-native';
import NavigationViewContainer from './navigation/NavigationViewContainer';
import AppRouter from './AppRouter';
import {Map, List} from 'immutable';
import SettingsButton from '../components/SettingsButton';
import Spinner from 'react-native-gifted-spinner';
import * as snapshotUtil from '../utils/snapshot';
import * as NavigationState from '../modules/navigation/NavigationState';
import * as SessionState from '../modules/session/SessionState';
import store from '../redux/store';

import Orientation from 'react-native-orientation';

const AppView = React.createClass({
  propTypes: {
    isReady: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    currentUser: PropTypes.instanceOf(Map),
    currentPage: PropTypes.number,
    pages: PropTypes.instanceOf(List)
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
          dispatch(SessionState.resetSessionStateFromSnapshot(snapshot))
            .then(() => {
              this.props.dispatch(SessionState.activate());
              this.resetRoute();
            });
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

  _handleAppStateChange(appState) {

    var previous = this.state.currentState;

    this.setState({currentState: appState, previousState: previous});

    if (this.state.currentState === 'active') {
      Orientation.lockToLandscape();
      this.props.dispatch(SessionState.activate());
    }
    else if (this.state.currentState === 'inactive' || this.state.currentState === 'background') {
      this.props.dispatch(SessionState.deactivate());
    }
  },

  resetRoute() {
    this.props.dispatch(NavigationState.resetRoute());
  },

  end() {
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

    if (this.props.currentUser.get('id') !== null) {

      var phase;
      var showSettingsCircle = true;

      if (this.props.pages.get(this.props.currentPage - 1).get('key') === 'Emotions') {
        phase = 'Emotions';
      }
      else if (this.props.pages.get(this.props.currentPage).get('key') === 'Settings') {
        showSettingsCircle = false;
      }
      if (this.props.currentPage === 1) {
        phase = 'Do nothing';
      }
      else {
        phase = 'Other';
      }

      if (showSettingsCircle === true) {
        var currentUser = (
          <SettingsButton
            resetRoute={this.resetRoute}
            phase={phase}
            currentUser={this.props.currentUser}
            end={this.end}/>);
      }
      else {
        currentUser = null;
      }
    }
    else {
      currentUser = null;
    }

    return (
      <View style={{flex: 1}}>
        <NavigationViewContainer router={AppRouter} />
        {currentUser}
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
