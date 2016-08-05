import React, {PropTypes} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
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
var graphics = require('./graphics.js');

const AudioRecorder = React.createClass({
  propTypes: {
    save: PropTypes.func.isRequired
  },

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
      if (this.recorder && this.recorder.isRecording) {
        if (this.state.progress >= 100) {
          this._toggleRecord();
        }
        else {
          this.setState({progress: this.state.progress + 1});
        }
      }
    }, 1200);
  },

  componentWillUnmount() {
    this.recorder.destroy();
    if (this.player) {
      this.player.destroy();
    }
    clearInterval(this._progressInterval);
  },

  _updateState() {
    this.setState({
      recordButton: this.recorder && this.recorder.isRecording ? 'Stop' : 'Record',
      recordButtonDisabled: !this.recorder
    });
  },

  _reloadRecorder() {
    if (this.recorder) {
      this.recorder.destroy();
    }

    this.recorder = new Recorder(filename, {
      bitrate: 256000,
      channels: 2,
      sampleRate: 44100,
      quality: 'max'
      //format: 'ac3', // autodetected
      //encoder: 'aac', // autodetected
    }).prepare();

    this._updateState();
  },

  _reloadPlayer() {
    if (this.player) {
      this.player.destroy();
    }
    if (this.recorder) {
      this.recorder.destroy();
    }

    this.player = new Player(filename, {
      autoDestroy: false
    }).prepare((err) => {
      if (err) {
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
        this.setState({
          error: err.message
        });
        this._updateState();
      }
      if (stopped) {
        this.props.save('file');
        // this._reloadPlayer();
      }
      else {
        this._updateState();
      }
    });
  },

  renderRecordButton() {
    if (this.state.recordButton === 'Record') {
      return (
        <TouchableOpacity onPress={() => this._toggleRecord()} style={styles.highlightCircle}>
          <Image source={graphics.get('nappula_rec')} style={styles.containerStyleCircle}/>
        </TouchableOpacity>);
    }
    else if (this.state.recordButton === 'Stop') {
      return (
        <TouchableOpacity onPress={() => this._toggleRecord()} style={styles.highlightSquare}>
          <Image source={graphics.get('nappula_stop')} style={styles.containerStyleSquare}/>
        </TouchableOpacity>);
    }
    else {
      return null;
    }
  },

  render() {

    var button = this.renderRecordButton();

    return (
      <View style={styles.recordRow}>
        {button}
        <View style={{flex: 1, marginLeft: 10}}>
          <ProgressBarClassic style={styles.progressBar} valueStyle={'none'} progress={this.state.progress} />
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
  containerStyleSquare: {
    height: 120,
    width: 120
  },
  containerStyleCircle: {
    height: 120,
    width: 120
  },
  highlightCircle: {
    height: 120,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  highlightSquare: {
    height: 120,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressBar: {
    borderColor: 'black'
  }
});

export default AudioRecorder;
