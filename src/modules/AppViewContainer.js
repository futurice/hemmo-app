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
} from 'react-native';
import NavigationViewContainer from './navigation/NavigationViewContainer';
import * as snapshotUtil from '../utils/snapshot';
import { getImage, getSizeByWidth } from '../services/graphics';
import { resetCurrentUser } from '../state/UserState';
import {
  initializeSessionState,
  activate,
  deactivate,
  resetSessionStateFromSnapshot,
} from '../state/SessionState';
import AppButton from '../components/AppButton';
import store from '../redux/store';
import Hemmo from './Hemmo';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  exitModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  quitButtonText: {
    fontSize: 25,
    color: '#f64343',
  },
  continueButtonText: {
    fontSize: 25,
    color: '#3ac366',
  },
  navigationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitModalText: {
    flex: 1,
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  quitButton: {
    margin: 20,
    alignItems: 'center',
  },
  continueButton: {
    margin: 20,
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    left: 5,
    top: 5,
    ...Platform.select({
      ios: {
        top: 20,
      },
    }),
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
  back: () => dispatch(NavigationActions.back()),
  initializeSessionState: () => dispatch(initializeSessionState()),
  activate: () => dispatch(activate()),
  deactivate: () => dispatch(deactivate()),
  resetSessionStateFromSnapshot: snapshot =>
    dispatch(resetSessionStateFromSnapshot(snapshot)),
  resetCurrentUser: () => dispatch(resetCurrentUser()),
  resetRoute: () =>
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      }),
    ),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class AppViewContainer extends Component {
  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    initializeSessionState: PropTypes.func.isRequired,
    activate: PropTypes.func.isRequired,
    deactivate: PropTypes.func.isRequired,
    resetCurrentUser: PropTypes.func.isRequired,
    currentUser: PropTypes.instanceOf(Map).isRequired,
    resetSessionStateFromSnapshot: PropTypes.func.isRequired,
    activeRouteIndex: PropTypes.number.isRequired,
    activeRoute: PropTypes.string.isRequired,
    back: PropTypes.func.isRequired,
  };

  state = {
    currentState: AppState.currentState,
    previousState: null,
    modalVisible: false,
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    /* Haetaan viimeisin tila */
    snapshotUtil.resetSnapshot().then(snapshot => {
      /* Jos viimeisin tila löytyi */
      if (false && snapshot) {
        this.props.resetSessionStateFromSnapshot(snapshot);
        this.props.activate();
      } else {
        /* Ei löytynyt. Aloitetaan alusta */
        this.props.initializeSessionState();
      }

      /* Tallennetaan uusin tila aina kun statea päivitetään */
      store.subscribe(() => {
        snapshotUtil.saveSnapshot(store.getState());
      });
    });
  }

  navigateBack = () => {
    if (this.props.activeRoute === 'FeedbackMenu') {
      this.setState({ modalVisible: true });
      return true;
    }

    if (this.props.activeRouteIndex !== 0) {
      this.props.back();
      return true;
    }

    // otherwise let OS handle the back button action
    return false;
  };

  quit = () => {
    this.setState({ modalVisible: false });
    this.props.back();
  };

  continue = () => {
    this.setState({ modalVisible: false });
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

  renderExitModalText = () =>
    <Text style={styles.exitModalText}>
      (NO DESIGN YET) Haluatko lopettaa palautteen antamisen?
    </Text>;

  renderContinueButton = () =>
    <View style={styles.continueButton}>
      <AppButton
        background="thumb_up"
        onPress={this.continue}
        width={getSizeByWidth('thumb_up', 0.13).height}
        shadow
      />
      <Text style={styles.continueButtonText}>Jatka</Text>
    </View>;

  renderQuitButton = () =>
    <View style={styles.quitButton}>
      <AppButton
        background="thumb_down"
        onPress={this.quit}
        width={getSizeByWidth('thumb_down', 0.13).height}
        shadow
      />
      <Text style={styles.quitButtonText}>Lopeta</Text>
    </View>;

  renderExitModal = () =>
    this.state.modalVisible
      ? <Modal
          animationType={'fade'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => console.log(' ')}
          supportedOrientations={['portrait', 'landscape']}
        >
          <View style={styles.exitModal}>
            <Image
              source={getImage('modal').shadow}
              style={getSizeByWidth('modal', 0.53)}
            >
              {this.renderExitModalText()}
              <View style={styles.navigationButtons}>
                {this.renderQuitButton()}
                {this.renderContinueButton()}
              </View>
            </Image>
          </View>
        </Modal>
      : null;

  renderUserImage = () =>
    this.props.activeRoute === 'FeedbackMenu'
      ? <TouchableOpacity
          onPress={() => this.setState({ modalVisible: true })}
          style={styles.circle}
        >
          <Image
            style={styles.userImage}
            source={
              this.props.currentUser.get('image')
                ? { uri: this.props.currentUser.get('image') }
                : getImage('default_image').normal
            }
          />
        </TouchableOpacity>
      : null;

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
        <Hemmo />
        {this.renderUserImage()}
        {this.renderExitModal()}
      </View>
    );
  }
}
