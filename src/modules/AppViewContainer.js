import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, AppState, ActivityIndicator } from 'react-native';
import NavigationViewContainer from './navigation/NavigationViewContainer';
import * as snapshotUtil from '../utils/snapshot';
import {
  initializeSessionState,
  activate,
  deactivate,
  resetSessionStateFromSnapshot,
} from '../state/SessionState';
import store from '../redux/store';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  isReady: state.getIn(['session', 'isReady']),
  currentUser: state.getIn(['user', 'currentUser']),
  currentPage: state.getIn(['navigatorState', 'index']),
  pages: state.getIn(['navigatorState', 'routes']),
});

const mapDispatchToProps = dispatch => ({
  initializeSessionState: () => dispatch(initializeSessionState()),
  activate: () => dispatch(activate()),
  deactivate: () => dispatch(deactivate()),
  resetSessionStateFromSnapshot: snapshot => dispatch(resetSessionStateFromSnapshot(snapshot)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class AppViewContainer extends Component {

  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    initializeSessionState: PropTypes.func.isRequired,
    activate: PropTypes.func.isRequired,
    deactivate: PropTypes.func.isRequired,
    resetSessionStateFromSnapshot: PropTypes.func.isRequired,
  };

  state = {
    currentState: AppState.currentState,
    previousState: null,
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);

    /* Haetaan viimeisin tila */
    snapshotUtil.resetSnapshot()
    .then((snapshot) => {
      /* Jos viimeisin tila löytyi */
      if (false && snapshot) {
        this.props.resetSessionStateFromSnapshot(snapshot);
        this.props.activate();
      }
      /* Ei löytynyt. Aloitetaan alusta */
      else {
        this.props.initializeSessionState();
      }

      /* Tallennetaan uusin tila aina kun statea päivitetään */
      store.subscribe(() => {
        snapshotUtil.saveSnapshot(store.getState());
      });
    });
  }

  _handleAppStateChange = (appState) => {
    const previous = this.state.currentState;

    this.setState({ currentState: appState, previousState: previous });

    if (this.state.currentState === 'active') {
      this.props.activate();
    } else if (this.state.currentState === 'inactive' || this.state.currentState === 'background') {
      this.props.deactivate();
    }
  };

  render() {
    if (!this.props.isReady) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <NavigationViewContainer />
      </View>
    );
  }
}
