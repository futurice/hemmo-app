import React, {PropTypes} from 'react';
import {Platform, DeviceEventEmitter} from 'react-native';
import {Player} from 'react-native-audio-toolkit';

const AudioPlayer = React.createClass({

  propTypes: {
    audioTrack: PropTypes.string,
    onEnd: PropTypes.func.isRequired
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
    this.player.on('ended', () => {
      console.log('loppui!');
      this.props.onEnd();
    });
    // DeviceEventEmitter.addListener('RCTAudioPlayerEvent:' + this.player._playerId, (payload: Event) => {
    //   this._handleEvent(payload.event, payload.data);
    // });
  },

  componentDidMount() {
    this.player.play();
  },

  componentWillUnmount() {
    this.player.destroy();
  },

  // _handleEvent(event, data) {
  //   super();
  //   switch (event) {
  //     case 'ended':
  //       console.log('nauhoite loppui!!');
  //       break;
  //     default: {
  //       break;
  //     }
  //   }
  // },
  render() {
    return null;
  }
});

export default AudioPlayer;
