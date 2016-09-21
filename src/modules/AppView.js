import React, {PropTypes} from 'react';
import {View, StyleSheet, AppState} from 'react-native';
import NavigationViewContainer from './navigation/NavigationViewContainer';
import AppRouter from './AppRouter';
import {Map, List} from 'immutable';
import NavigationModal from '../components/NavigationModal';
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

  quit() {
    this.props.dispatch(NavigationState.pushRoute({key: 'End', allowReturn: false}));
  },

  render() {
    if (!this.props.isReady) {
      return (
        <View style={styles.centered}>
          <Spinner />
        </View>
      );
    }

    var currentUser = null;

    if (this.props.currentUser.get('id') !== null) {
      var key = this.props.pages.get(this.props.currentPage).get('key');
      var shouldSave = true;
      var phase = 'other';

      /* If user quits app on first page, nothing needs to be saved to backend */
      if (this.props.currentPage === 1) {
        shouldSave = false;
      }

      if (this.props.pages.get(this.props.currentPage - 1).get('key') === 'Moods') {
        phase = 'moods';
      }

      /* Button on top right corner isn't shown when in settings, home or last page */
      if (key !== 'Settings' && key !== 'Home' && key !== 'End') {
        currentUser = (
          <NavigationModal
            resetRoute={this.resetRoute}
            phase={phase}
            shouldSave={shouldSave}
            currentUser={this.props.currentUser}
            quit={this.quit}/>);
      }

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
