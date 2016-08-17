import React, {PropTypes} from 'react';
import {Platform} from 'react-native';
import {Player} from 'react-native-audio-toolkit';

const AudioPlayer = React.createClass({

  propTypes: {
    audioTrack: PropTypes.string
  },

  componentWillMount() {
    var audioTrack;

    if (Platform.OS === 'ios') {
      audioTrack = '/audio/' + this.props.audioTrack + '.wav';
    }
    else {
      audioTrack = this.props.audioTrack;
    }

    this.player = new Player(audioTrack).prepare();
  },

  componentDidMount() {
    this.player.play();
  },

  componentWillUnmount() {
    this.player.destroy();
  },

  render() {
    return null;
  }
});

export default AudioPlayer;
