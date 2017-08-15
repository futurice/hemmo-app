import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { NavigationActions } from 'react-navigation';
import {
  View,
  StyleSheet,
  AppState,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  Modal,
  Text,
  Image,
  Platform,
  Alert,
} from 'react-native';
import NavigationViewContainer from './navigation/NavigationViewContainer';
import { getImage, getSizeByWidth } from '../services/graphics';
import { resetCurrentUser } from '../state/UserState';
import { showExitModal } from '../state/SessionState';
import { setText, setAudio } from '../state/HemmoState';
import {
  initializeSessionState,
  activate,
  deactivate,
} from '../state/SessionState';
import AppButton from '../components/AppButton';
import store from '../redux/store';
import persistStore from '../utils/persist';
import Hemmo from './Hemmo';

const Permissions = require('react-native-permissions');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  isReady: state.getIn(['session', 'isReady']),
  currentUser: state.getIn(['user', 'currentUser']),
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
  back: () => {
    dispatch(setText(''));
    dispatch(setAudio(''));
    dispatch(NavigationActions.back());
  },
  initializeSessionState: () => dispatch(initializeSessionState()),
  activate: () => dispatch(activate()),
  deactivate: () => {
    dispatch(setText(''));
    dispatch(setAudio(''));
    dispatch(deactivate());
  },
  resetCurrentUser: () => dispatch(resetCurrentUser()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class AppViewContainer extends Component {
  static propTypes = {
    showExitModal: PropTypes.func.isRequired,
    isReady: PropTypes.bool.isRequired,
    initializeSessionState: PropTypes.func.isRequired,
    activate: PropTypes.func.isRequired,
    deactivate: PropTypes.func.isRequired,
    resetCurrentUser: PropTypes.func.isRequired,
    currentUser: PropTypes.instanceOf(Map).isRequired,
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
      return Alert.alert(
        'Saammeko käyttää laitteesi mikrofonia?',
        'Tarvitsemme oikeuden mikrofoniin, jotta äänen nauhoittaminen onnistuu.',
        [
          {
            text: 'Estä',
            onPress: () => console.log('permission denied'),
            style: 'cancel',
          },
          permission === 'undetermined' || Platform.OS === 'android'
            ? { text: 'Salli', onPress: this.showRequestAlert }
            : { text: 'Avaa asetukset', onPress: Permissions.openSettings },
        ],
      );
    }
  }

  showRequestAlert = async () => {
    await this.requestRecordPermission();
  };

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

    if (!rehydrated) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <NavigationViewContainer />
        <Hemmo />
      </View>
    );
  }
}
