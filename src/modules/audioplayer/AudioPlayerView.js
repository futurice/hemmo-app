import React, {PropTypes} from 'react';
import {Platform} from 'react-native';
import {Player} from 'react-native-audio-toolkit';

const AudioPlayerView = React.createClass({

  propTypes: {
    audioTrack: PropTypes.string,
    onEnd: PropTypes.func.isRequired,
    isActive: PropTypes.bool
  },

  componentWillMount() {
    // AppState.addEventListener('change', this._handleAppStateChange);
    var audioTrack;

    if (Platform.OS === 'ios') {
      audioTrack = '/audio/' + this.props.audioTrack + '.wav';
    }
    else {
      audioTrack = this.props.audioTrack;
    }

    this.player = new Player(audioTrack).prepare();
    this.player.on('ended', () => {
      console.log('loppui!');
      this.props.onEnd();
    });
  },

  componentWillUnmount() {
    this.player.destroy();
  },

  checkActivity() {
    if (this.props.isActive === true) {
      console.log('LETS PLAY');
      this.player.play();
    }
    else if (this.props.isActive === false) {
      console.log('lets stop');
      this.player.destroy();
    }
  },

  render() {
    console.log('render');
    this.checkActivity();

    return null;
  }
});

export default AudioPlayerView;
