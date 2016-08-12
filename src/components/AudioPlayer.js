import React, {PropTypes} from 'react';
import {
  Player
} from 'react-native-audio-toolkit';

const AudioPlayer = React.createClass({

  propTypes: {
    audioTrack: PropTypes.string
  },

  componentWillMount() {
    this.player = new Player('/audio/' + this.props.audioTrack).prepare();
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
