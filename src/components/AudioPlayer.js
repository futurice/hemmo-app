import React, {PropTypes} from 'react';
import {
  Player
} from 'react-native-audio-toolkit';

const AudioPlayer = React.createClass({

  propTypes: {
    audioTrack: PropTypes.string
  },

  componentWillMount() {
    // var track = this.props.audioTrack + '.mp3';
    this.player = new Player('drumsticks.mp3').prepare();
    // console.log('this.player.path ' + JSON.stringify(this.player.state));
  },

  componentDidMount() {
    this.player.play();
    // console.log('state ' + this.player.state);
  },

  componentWillUnmount() {
    this.player.destroy();
  },

  render() {
    return null;
  }
});

export default AudioPlayer;
