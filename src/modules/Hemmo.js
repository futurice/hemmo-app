import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Modal,
  AppState,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { getSizeByHeight, getSizeByWidth } from '../services/graphics';
import AudioPlayerViewContainer from './AudioPlayerViewContainer';
import { toggleMute, setText, setAudio } from '../state/HemmoState';
import AppButton from '../components/AppButton';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
  },
  hemmo: {
    alignSelf: 'flex-end',
    top: 2,
    ...Platform.select({
      ios: {
        top: 20,
      },
    }),
  },
  bubbleContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
  },
  bubble: {
    alignSelf: 'center',
    marginTop: 20,
  },
  toggleVolumeButton: {},
  text: {
    padding: 50,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 15,
    color: '#000',
    fontFamily: 'ComicNeue-Bold',
  },
});

const reactMixin = require('react-mixin');
const phrases = require('../data/phrases.json');

const mapStateToProps = state => ({
  text: state.getIn(['hemmo', 'text']),
  audio: state.getIn(['hemmo', 'audio']),
  muted: state.getIn(['hemmo', 'muted']),
  activeRoute: state.getIn([
    'navigatorState',
    'routes',
    state.getIn(['navigatorState', 'index']),
    'routeName',
  ]),
  routes: state.getIn(['navigatorState', 'routes']),
});

const mapDispatchToProps = dispatch => ({
  toggleMute: () => dispatch(toggleMute()),
  setText: text => dispatch(setText(text)),
  setAudio: audio => dispatch(setAudio(audio)),
});

@connect(mapStateToProps, mapDispatchToProps)
@reactMixin.decorate(TimerMixin)
export default class Hemmo extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    activeRoute: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
    setText: PropTypes.func.isRequired,
    setAudio: PropTypes.func.isRequired,
    toggleMute: PropTypes.func.isRequired,
    muted: PropTypes.bool.isRequired,
  };

  state = {
    currentAppState: AppState.currentState,
    showBubble: false,
    mutePressed: false,
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.activeRoute !== this.props.activeRoute &&
      this.props.routes.size > prevProps.routes.size
    ) {
      if (this.props.activeRoute === 'Ending') {
        setTimeout(this.showBubble, 3000);
      } else {
        await this.showBubble();
      }
    }

    if (this.props.routes.size < prevProps.routes.size) {
      await this.setEmptyText();
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  onEnd = () => {};

  setDefaultText = async () => {
    const routeName = this.props.activeRoute;

    if (!phrases[routeName]) return;

    await this.props.setText(phrases[routeName].text);
    await this.props.setAudio(phrases[routeName].audio);
  };

  setEmptyText = async () => {
    await this.props.setText('');
    await this.props.setAudio('');
  };

  showBubble = async () => {
    if (!this.props.text || !this.props.audio) {
      await this.setDefaultText();
    }

    if (
      this.state.currentAppState === 'active' &&
      this.props.text &&
      this.props.audio
    ) {
      this.setState({ showBubble: true });
    }
  };

  hideBubble = async () => {
    this.setState({ showBubble: false, mutePressed: false });

    await this.setEmptyText();
  };

  toggleMute = async () => {
    await this.props.setAudio('');
    await this.props.setText('');

    if (this.props.muted) {
      await this.props.setAudio(phrases.unmute.audio);
      await this.props.setText(phrases.unmute.text);
    } else {
      this.setState({ mutePressed: true });
      await this.props.setAudio(phrases.mute.audio);
      await this.props.setText(phrases.mute.text);
    }

    await this.props.toggleMute();
  };

  handleAppStateChange = async currentAppState => {
    if (currentAppState !== 'active') {
      await this.hideBubble();
    }

    this.setState({ currentAppState });
  };

  renderBubble = () =>
    this.state.showBubble
      ? <Modal
          animationType={'fade'}
          transparent
          visible={this.state.showBubble}
          onRequestClose={() => console.log(' ')}
          supportedOrientations={['portrait', 'landscape']}
        >
          <TouchableOpacity
            style={styles.bubbleContainer}
            onPress={this.hideBubble}
          >
            {this.renderHemmoButton()}
            {this.renderBubbleButton()}
            {this.renderMuteButton()}
          </TouchableOpacity>
        </Modal>
      : null;

  renderAudio = () => {
    if (
      this.state.currentAppState === 'active' &&
      this.props.audio &&
      (!this.props.muted || this.state.mutePressed)
    ) {
      return (
        <AudioPlayerViewContainer
          onEnd={this.onEnd}
          audioTrack={this.props.audio}
        />
      );
    }

    return null;
  };

  renderMuteButton = () =>
    <View style={styles.toggleVolumeButton}>
      <AppButton
        background={this.props.muted ? 'volume_is_off' : 'volume_is_on'}
        onPress={this.toggleMute}
        width={getSizeByWidth('volume_is_off', 0.07).width}
        shadow
      />
    </View>;

  renderBubbleButton = () =>
    <View style={styles.bubble}>
      <AppButton
        background="puhekupla"
        onPress={this.hideBubble}
        width={getSizeByWidth('puhekupla', 0.55).width}
        shadow
      >
        <Text style={styles.text}>
          {this.props.text}
        </Text>
      </AppButton>
    </View>;

  renderHemmoButton = () =>
    <View style={styles.hemmo}>
      <AppButton
        background="hemmo"
        onPress={this.state.showBubble ? this.hideBubble : this.showBubble}
        width={getSizeByHeight('hemmo', 0.15).width}
        shadow
      />
    </View>;

  render() {
    if (
      this.props.activeRoute === 'Login' ||
      this.props.activeRoute === 'Settings'
    ) {
      return null;
    }

    return (
      <View style={styles.container}>
        {this.renderBubble()}
        {this.renderAudio()}
        {phrases[this.props.activeRoute] ? this.renderHemmoButton() : null}
      </View>
    );
  }
}
