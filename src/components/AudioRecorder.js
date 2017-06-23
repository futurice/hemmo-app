/*
View block that includes audio recording button and progression bar.
*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getSizeByHeight, getImage} from '../services/graphics';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import ProgressBarClassic from 'react-native-progress-bar-classic';
import TimerMixin from 'react-timer-mixin';
import {
  Recorder,
  Player
} from 'react-native-audio-toolkit';

const styles = StyleSheet.create({
  recordRow: {
    flex: 2,
    marginLeft: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  highlightCircle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  highlightSquare: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressBar: {
    borderColor: 'black'
  }
});

let reactMixin = require('react-mixin');
let filename = 'test.mp4';

@reactMixin.decorate(TimerMixin)
export default class AudioRecorder extends Component {

  static propTypes = {
    save: PropTypes.func.isRequired,
    phase: PropTypes.string,
    toggleWritingButton: PropTypes.func
  };

  state = {
    recordButton: 'Preparing...',
    recordButtonDisabled: true,
    progress: 0,
    filePath: null,
    recording: false,
    error: null
  };

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
  }

  componentWillUnmount() {
    this.recorder.destroy();

    if (this.player) {
      this.player.destroy();
    }

    clearInterval(this._progressInterval);
  }

  _updateState = () => {
    this.setState({
      recordButton: this.recorder && this.recorder.isRecording ? 'Stop' : 'Record',
      recording: this.recorder && this.recorder.isRecording ? true : false,
      recordButtonDisabled: !this.recorder
    });

    this.props.toggleWritingButton(this.state.recording);
  };

  _reloadRecorder = () => {
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
    }).prepare((err, filePath) => {
      if (err) {
        console.error(err);
      }

      this.setState({filePath});
    });

    this._updateState();
  };

  _reloadPlayer = () => {
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
  };

  _toggleRecord = () => {
    this.recorder.toggleRecord((err, stopped) => {
      if (err) {
        this.setState({
          error: err.message
        });
        this._updateState();
      }
      if (stopped) {
        this._updateState();
        this.setState({progress: 0});
        this.recorder.destroy();
        this.props.save(this.props.phase, 'audio', this.state.filePath);
      }
      else {
        this._updateState();
      }
    });
  };

  renderStartRecordButton = () => {
    return (
      <TouchableOpacity
        onPress={() => this._toggleRecord()}
        style={[styles.highlightCircle, getSizeByHeight('nappula_rec', 0.35)]}>
        <Image source={getImage('nappula_rec')} style={getSizeByHeight('nappula_rec', 0.35)}/>
      </TouchableOpacity>
    );
  };

  renderStopRecordButton = () => {
    return (
      <TouchableOpacity
        onPress={() => this._toggleRecord()}
        style={[styles.highlightSquare, getSizeByHeight('nappula_stop', 0.35)]}>
        <Image source={getImage('nappula_stop')} style={getSizeByHeight('nappula_stop', 0.35)}/>
      </TouchableOpacity>
    );
  };

  renderRecordButton = () => {
    if (this.state.recordButton === 'Record') {
      return this.renderStartRecordButton();
    }
    else if (this.state.recordButton === 'Stop') {
      return this.renderStopRecordButton();
    }
    else {
      return null;
    }
  };

  render() {
    return (
      <View style={styles.recordRow}>
        {this.renderRecordButton()}
        <View style={{flex: 1, marginLeft: 20}}>
          <ProgressBarClassic style={styles.progressBar} valueStyle={'none'} progress={this.state.progress} />
        </View>
      </View>
    );
  }
}
