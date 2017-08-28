import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import { NavigationActions } from 'react-navigation';
import { View, StyleSheet, AppState, BackHandler } from 'react-native';
import NavigationViewContainer from './navigation/NavigationViewContainer';
import { editUser } from '../state/UserState';
import { setText, setAudio } from '../state/HemmoState';
import { activate, deactivate, showExitModal } from '../state/SessionState';
import store from '../redux/store';
import persistStore from '../utils/persist';
import Hemmo from './Hemmo';
import SaveConfirmationWindow from '../components/SaveConfirmationWindow';
import BackgroundTask from 'react-native-background-task';
import PushNotification from '../utils/pushNotification';
import LoadingSpinner from '../components/LoadingSpinner';

const Permissions = require('react-native-permissions');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  isLoading: state.getIn(['session', 'isLoading']),
  currentUser: state.getIn(['user', 'currentUser']),
  users: state.getIn(['user', 'users']),
  activeRouteIndex: state.getIn(['navigatorState', 'index']),
  activeRoute: state.getIn([
    'navigatorState',
    'routes',
    state.getIn(['navigatorState', 'index']),
    'routeName',
  ]),
});

const mapDispatchToProps = dispatch => ({
  showExitModal: () => dispatch(showExitModal()),
  back: key => {
    dispatch(setText(''));
    dispatch(setAudio(''));
    dispatch(NavigationActions.back({ key }));
  },
  activate: () => dispatch(activate()),
  deactivate: () => {
    dispatch(setText(''));
    dispatch(setAudio(''));
    dispatch(deactivate());
  },
  editUser: user => dispatch(editUser(user)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class AppViewContainer extends Component {
  static propTypes = {
    showExitModal: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    activate: PropTypes.func.isRequired,
    deactivate: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    currentUser: PropTypes.instanceOf(Map).isRequired,
    users: PropTypes.instanceOf(List).isRequired,
    activeRouteIndex: PropTypes.number.isRequired,
    activeRoute: PropTypes.string.isRequired,
    back: PropTypes.func.isRequired,
  };

  state = {
    currentState: AppState.currentState,
    previousState: null,
    exitModalVisible: false,
    rehydrated: false,
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
  }

  async componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    persistStore(store, () => this.setState({ rehydrated: true }));

    const permission = await this.checkRecordPermission();

    if (permission !== 'authorized') {
      await this.requestRecordPermission();
    }

    BackgroundTask.define(async () => {
      const currentDate = Date.now();

      await this.props.users.map(user => {
        const lastFeedbackDate = user.get('lastFeedbackSentOn');
        const diffDays = Math.ceil((currentDate - lastFeedbackDate) / 86400000);

        if (diffDays >= 33) {
          PushNotification.localNotification({
            message: `Moi ${user.get(
              'name',
            )}! En ole kuullut sinusta hetkeen. Miten tukiperheen kanssa menee? :)`,
            playSound: false,
          });
        }

        this.props.editUser(
          Map({
            id: user.get('id'),
            lastFeedbackSentOn: currentDate,
          }),
        );
      });

      BackgroundTask.finish();
    });

    // Run the background task every day
    BackgroundTask.schedule({ period: 86400 });
  }

  checkRecordPermission = async () => {
    try {
      return await Permissions.check('microphone');
    } catch (e) {
      console.log(e);
    }

    return 'undetermined';
  };

  requestRecordPermission = async () => {
    try {
      return await Permissions.request('microphone');
    } catch (e) {
      console.log(e);
    }

    return 'undetermined';
  };

  navigateBack = () => {
    if (this.props.activeRoute === 'FeedbackMenu') {
      this.props.showExitModal();
      return true;
    }

    if (
      this.props.activeRouteIndex !== 0 &&
      this.props.activeRoute !== 'Ending'
    ) {
      this.props.back();
      return true;
    }

    // otherwise let OS handle the back button action
    return false;
  };

  handleAppStateChange = appState => {
    const previous = this.state.currentState;

    this.setState({ currentState: appState, previousState: previous });

    if (this.state.currentState === 'active') {
      this.props.activate();
    } else if (
      this.state.currentState === 'inactive' ||
      this.state.currentState === 'background'
    ) {
      this.props.deactivate();
    }
  };

  render() {
    const { rehydrated } = this.state;

    if (!rehydrated || this.props.isLoading) {
      return <LoadingSpinner />;
    }

    return (
      <View style={styles.container}>
        <NavigationViewContainer />
        <Hemmo />
        <SaveConfirmationWindow />
      </View>
    );
  }
}
