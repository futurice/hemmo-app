import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  AppState,
  Text,
} from 'react-native';
import { getImage, getSizeByHeight } from '../../services/graphics';
import AudioPlayerViewContainer from '../AudioPlayerViewContainer';
import { toggleMute, setText, setAudio } from '../../state/HemmoState';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    height: 51,
    width: 87,
  },
  bubbleImage: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Gill Sans',
    fontSize: 12,
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10,
  },
});

const reactMixin = require('react-mixin');

const mapStateToProps = state => ({
  text: state.getIn(['hemmo', 'text']),
  audio: state.getIn(['hemmo', 'audio']),
  muted: state.getIn(['hemmo', 'muted']),
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
    text: PropTypes.string,
    audio: PropTypes.string,
    setText: PropTypes.func,
    setAudio: PropTypes.func,
    toggleMute: PropTypes.func,
    muted: PropTypes.bool,
  };

  state = {
    currentAppState: AppState.currentState,
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  onEnd = () => {};

  toggleBubble = () => {
    this.props.setText('');
    this.props.setAudio('');
  };

  toggleMute = () => {
    this.props.setText(
      this.props.muted
        ? 'Nyt puhun taas!'
        : 'Tästä lähtien olen hiljaa! Klikkaa minua uudestaan, niin alan taas puhumaan.',
    );
    this.props.toggleMute();
  };

  handleAppStateChange = currentAppState => {
    this.setState({ currentAppState });
  };

  renderBubble = () =>
    this.state.currentAppState === 'active' && this.props.text.length !== 0
      ? <Modal
          animationType={'fade'}
          transparent
          visible={
            this.props.text.length !== 0 &&
            this.state.currentAppState === 'active'
          }
          onRequestClose={() => console.log(' ')}
          supportedOrientations={['portrait', 'landscape']}
        >
          <TouchableOpacity onPress={this.toggleBubble}>
            <Image
              source={getImage('puhekupla_oikea')}
              style={[
                styles.bubbleImage,
                getSizeByHeight('puhekupla_oikea', 0.5),
              ]}
            >
              <Text style={styles.text}>
                {this.props.text}
              </Text>
            </Image>
          </TouchableOpacity>
        </Modal>
      : null;

  renderAudio = () =>
    this.props.audio && !this.props.muted
      ? <AudioPlayerViewContainer
          onEnd={this.onEnd}
          audioTrack={this.props.audio}
        />
      : null;

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        {this.renderBubble()}
        {this.renderAudio()}
        <TouchableOpacity onPress={this.toggleMute}>
          <Image source={require('./hemmo.png')} style={styles.image} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}
