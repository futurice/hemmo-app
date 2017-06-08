import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
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

const AppViewContainer = React.createClass({
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
    let previous = this.state.currentState;

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

  shouldRenderNavigationModal() {
    let key = this.props.pages.get(this.props.currentPage).get('key');

    return key !== 'Settings' && key !== 'Home' && key !== 'End';
  },

  renderNavigationModal() {
    return this.shouldRenderNavigationModal() ? (
      <NavigationModal
        resetRoute={this.resetRoute}
        phase={this.props.pages.get(this.props.currentPage - 1).get('key') === 'Moods' ? 'moods' : 'other'}
        shouldSave={this.props.currentPage !== 1}
        currentUser={this.props.currentUser}
        quit={this.quit}
      />
    ) : null;
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
        {this.renderNavigationModal()}
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

export default connect(
  state => ({
    isReady: state.getIn(['session', 'isReady']),
    currentUser: state.getIn(['user', 'currentUser']),
    currentPage: state.getIn(['navigationState', 'index']),
    pages: state.getIn(['navigationState', 'children'])
  })
)(AppViewContainer);
