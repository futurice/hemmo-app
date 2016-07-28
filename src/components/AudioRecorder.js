import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Button from './Button';
import ProgressBarClassic from 'react-native-progress-bar-classic';

import {
  Recorder,
  Player
} from 'react-native-audio-toolkit';

let filename = 'test.mp4';
var TimerMixin = require('react-timer-mixin');

const AudioRecorder = React.createClass({
  mixins: [TimerMixin],
  getInitialState() {
    return {
      recordButton: 'Preparing...',
      recordButtonDisabled: true,
      progress: 0,

      error: null
    };
  },

  componentWillMount() {
    this.recorder = null;
    this.lastSeek = 0;

    this._reloadRecorder();

    this._progressInterval = setInterval(() => {
      if (this.recorder && this.recorder.isRecording) {// && !this._dragging) {
        this.setState({progress: this.state.progress + 1});
      }
    }, 1000);
  },

  componentWillUnmount() {
    //console.log('unmount');
    // TODO
    clearInterval(this._progressInterval);
  },

  _updateState(err) {
    console.log('this.recorder ' + JSON.stringify(this.recorder));
    this.setState({
      recordButton: this.recorder && this.recorder.isRecording ? 'Stop' : 'Record',
      recordButtonDisabled: !this.recorder
    });

    console.log('state after update ' + JSON.stringify(this.state));
  },

  _reloadRecorder() {
    if (this.recorder) {
      console.log('destroyed old one');
      this.recorder.destroy();
    }
    // console.log('filename ' + filename);
    this.recorder = new Recorder(filename, {
      bitrate: 256000,
      channels: 2,
      sampleRate: 44100,
      quality: 'max'
      //format: 'ac3', // autodetected
      //encoder: 'aac', // autodetected
    }).prepare();
    console.log('recorder ' + JSON.stringify(this.recorder));

    this._updateState();
  },

  _reloadPlayer() {
    console.log('täällä ollaan soitinta luomassa');
    if (this.player) {
      this.player.destroy();
    }

    this.player = new Player(filename, {
      autoDestroy: false
    }).prepare((err) => {
      if (err) {
        console.log('error at _reloadPlayer():');
        console.log(err);
      } else {
        this.player.looping = this.state.loopButtonStatus;
      }

      this._updateState();
    });

    this.player.play();

    // this._updateState();
    //
    // this.player.on('ended', () => {
    //   this._updateState();
    // });
  },

  _toggleRecord() {

    this.recorder.toggleRecord((err, stopped) => {
      if (err) {
        console.log('ERRROR');
        this.setState({
          error: err.message
        });
      }
      if (stopped) {
        this._reloadPlayer();
      }
      this._updateState();
    });
  },

  renderRecordButton() {
    if (this.state.recordButton === 'Record') {
      var containerStyle = styles.containerStyleCircle;
      var highlight = styles.highlightCircle;
    }
    else if (this.state.recordButton === 'Stop') {
      containerStyle = styles.containerStyleSquare;
      highlight = styles.highlightSquare;
    }

    return (<Button
      style={containerStyle} highlightStyle={highlight}
      onPress={() => this._toggleRecord()} text={''} icon={''}/>);
  },

  render() {

    var button = this.renderRecordButton();

    return (

      <View style={styles.recordRow}>
        <View style={styles.buttonArea}>
            {button}
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <ProgressBarClassic valueStyle={'none'} progress={this.state.progress} />
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  recordRow: {
    flex: 2,
    marginLeft: 30,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonArea: {
    width: 130,
    height: 130,
    borderWidth: 2,
    borderRadius: 65,
    backgroundColor: 'rgb(240, 234, 234)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerStyleSquare: {
    borderWidth: 1,
    height: 80,
    width: 80,
    backgroundColor: 'black'
  },
  containerStyleCircle: {
    borderWidth: 1,
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'red'
  },
  highlightCircle: {
    borderRadius: 40,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  highlightSquare: {
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default AudioRecorder;
