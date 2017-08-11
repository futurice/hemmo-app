import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Player } from 'react-native-audio-toolkit';

const mapStateToProps = state => ({
  isActive: state.getIn(['session', 'isActive']),
});

@connect(mapStateToProps)
export default class AudioPlayerViewContainer extends Component {
  static propTypes = {
    audioTrack: PropTypes.string,
    onEnd: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
  };

  componentWillMount() {
    this.createPlayer(this.props.audioTrack);
  }

  componentWillReceiveProps(nextProps) {
    this.player.destroy();
    this.createPlayer(nextProps.audioTrack);
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  createPlayer = audioTrack => {
    this.player = new Player(`${audioTrack}.mp3`).prepare();

    this.player.on('ended', () => {
      this.props.onEnd();
    });
  };

  checkActivity = () => {
    if (this.props.isActive) {
      this.player.play();
    } else {
      this.player.destroy();
    }
  };

  render() {
    this.checkActivity();

    return null;
  }
}
