import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
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
    let audioTrack;

    if (Platform.OS === 'ios') {
      audioTrack = `/audio/${this.props.audioTrack}.wav`;
    } else {
      audioTrack = this.props.audioTrack;
    }

    /*
    this.player = new Player(audioTrack).prepare();

    this.player.on('ended', () => {
      this.props.onEnd();
    });
    */
  }

  componentWillUnmount() {
    //this.player.destroy();
  }

  checkActivity = () => {
    if (this.props.isActive) {
      //this.player.play();
    } else {
      //this.player.destroy();
    }
  };

  render() {
    this.checkActivity();

    return null;
  }
}
