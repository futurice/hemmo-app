import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  StyleSheet,
  Modal,
  AppState,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {
  getImage,
  getSizeByHeight,
  getSizeByWidth,
} from '../services/graphics';
import AudioPlayerViewContainer from './AudioPlayerViewContainer';
import { toggleMute, setText, setAudio } from '../state/HemmoState';
import AppButton from '../components/AppButton';

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    position: 'absolute',
    right: 0,
  },
  hemmo: {
    position: 'absolute',
    right: 0,
    top: 20,
  },
  bubbleContainer: {
    flex: 1,
    marginTop: 70,
    alignSelf: 'center',
    alignItems: 'center',
  },
  bubble: {
    alignSelf: 'center',
  },
  toggleVolumeButton: {},
  text: {
    padding: 50,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Gill Sans',
    fontSize: 15,
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
    activeRoute: PropTypes.string,
    text: PropTypes.string,
    audio: PropTypes.string,
    setText: PropTypes.func,
    setAudio: PropTypes.func,
    toggleMute: PropTypes.func,
    muted: PropTypes.bool,
  };

  state = {
    currentAppState: AppState.currentState,
    showBubble: false,
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.activeRoute !== this.props.activeRoute) {
      await this.showBubble();
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
    this.setState({ showBubble: false });
    await this.setEmptyText();
  };

  toggleMute = async () => {
    await this.props.toggleMute();

    if (this.props.muted) {
      await this.props.setText(
        'Tästä lähtien olen hiljaa! Klikkaa nappia uudestaan, niin alan taas puhumaan.',
      );
    } else {
      await this.setDefaultText();
    }
  };

  handleAppStateChange = currentAppState => {
    this.setState({ currentAppState });
  };

  renderBubble = () => {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.showBubble}
        onRequestClose={() => console.log(' ')}
        supportedOrientations={['portrait', 'landscape']}
      >
        <View style={styles.bubbleContainer}>
          {this.renderBubbleButton()}
          {this.renderMuteButton()}
        </View>
      </Modal>
    );
  };

  renderAudio = () => {
    if (
      this.state.currentAppState === 'active' &&
      this.props.audio &&
      !this.props.muted
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
        width={getSizeByWidth('puhekupla', 0.5).width}
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
        onPress={this.showBubble}
        width={getSizeByWidth('hemmo', 0.1).width}
        shadow
      />
    </View>;

  render() {
    const routeName = this.props.activeRoute;

    // Don't render button if there is no phrase for current screen
    if (!phrases[routeName]) return null;

    return (
      <View
        style={[
          styles.container,
          this.state.showBubble ? styles.background : null,
        ]}
      >
        {this.renderBubble()}
        {this.renderAudio()}
        {this.renderHemmoButton()}
      </View>
    );
  }
}
