import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, AppState, ActivityIndicator } from 'react-native';
import NavigationViewContainer from './navigation/NavigationViewContainer';
import { Map, List } from 'immutable';
import NavigationModal from '../components/NavigationModal';
import * as snapshotUtil from '../utils/snapshot';
import { NavigationActions } from 'react-navigation';
import {
  initializeSessionState,
  activate,
  deactivate,
  resetSessionStateFromSnapshot,
} from '../modules/session/SessionState';
import store from '../redux/store';
import Orientation from 'react-native-orientation';

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
  currentPage: state.getIn(['navigationState', 'index']),
  pages: state.getIn(['navigationState', 'children']),
});

const mapDispatchToProps = dispatch => ({
  initializeSessionState: () => dispatch(initializeSessionState()),
  activate: () => dispatch(activate()),
  deactivate: () => dispatch(deactivate()),
  resetSessionStateFromSnapshot: snapshot => dispatch(resetSessionStateFromSnapshot(snapshot)),
  navigate: route => dispatch(NavigationActions.navigate({ routeName: route })),
  resetRoute: () => dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Home' }),
    ],
  })),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class AppViewContainer extends Component {

  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    initializeSessionState: PropTypes.func.isRequired,
    activate: PropTypes.func.isRequired,
    deactivate: PropTypes.func.isRequired,
    resetSessionStateFromSnapshot: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    resetRoute: PropTypes.func.isRequired,
    currentUser: PropTypes.instanceOf(Map),
    currentPage: PropTypes.number,
    pages: PropTypes.instanceOf(List),
  };

  state = {
    currentState: AppState.currentState,
    previousState: null,
  };

  componentDidMount() {
    Orientation.lockToLandscape();
    AppState.addEventListener('change', this._handleAppStateChange);

    /* Haetaan viimeisin tila */
    snapshotUtil.resetSnapshot()
    .then((snapshot) => {
      /* Jos viimeisin tila löytyi */
      if (snapshot) {
        this.props.resetSessionStateFromSnapshot(snapshot)
        .then(() => {
          this.props.activate();
          this.props.resetRoute();
        });
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
      Orientation.lockToLandscape();
      this.props.activate();
    } else if (this.state.currentState === 'inactive' || this.state.currentState === 'background') {
      this.props.deactivate();
    }
  };

  shouldRenderNavigationModal = () => {
    const key = this.props.pages.get(this.props.currentPage).get('key');

    return key !== 'Settings' && key !== 'Home' && key !== 'End';
  };

  renderNavigationModal = () => this.shouldRenderNavigationModal() ? (
    <NavigationModal
      resetRoute={this.props.resetRoute}
      phase={this.props.pages.get(this.props.currentPage - 1).get('key') === 'Moods' ? 'moods' : 'other'}
      shouldSave={this.props.currentPage !== 1}
      currentUser={this.props.currentUser}
      quit={() => this.props.navigate('Ending')}
    />
    ) : null;

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
        {this.renderNavigationModal()}
      </View>
    );
  }
}
