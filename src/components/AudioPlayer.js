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
    console.log('audiotrack ' + audioTrack);
    this.player = new Player(audioTrack).prepare();
    // console.log('this.player path ' + this.player._path);
    // console.log('this.player.path ' + JSON.stringify(this.player.state));
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
