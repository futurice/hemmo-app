/*
 Speech bubble that shows what Hemmo is saying even if the app is muted.
 By clicking the bubble audio can be played again.
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AudioPlayerViewContainer from '../modules/audioplayer/AudioPlayerViewContainer';
import { getSizeByHeight, getImage } from '../services/graphics';
import { muteAudio } from '../modules/user/UserState';
import TimerMixin from 'react-timer-mixin';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  AppState,
} from 'react-native';

const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Gill Sans',
    fontSize: 12,
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10,
  },
});

const activities = require('../data/activities.js');
const phrases = require('../data/phrases.json');
const reactMixin = require('react-mixin');

let audiotrack;

const mapStateToProps = state => ({
  maIndex: state.getIn(['user', 'currentUser', 'answers', 'activities',
    state.getIn(['user', 'currentUser', 'activityIndex']), 'main']),
  saIndex: state.getIn(['user', 'currentUser', 'answers', 'activities',
    state.getIn(['user', 'currentUser', 'activityIndex']), 'sub']),
  audioMuted: state.getIn(['user', 'currentUser', 'audioMuted']),
});

const mapDispatchToProps = dispatch => ({
  muteAudio: () => dispatch(muteAudio()),
});

@connect(mapStateToProps, mapDispatchToProps)
@reactMixin.decorate(TimerMixin)
export default class SpeechBubble extends Component {

  static propTypes = {
    maIndex: PropTypes.number,
    saIndex: PropTypes.number,
    hideBubble: PropTypes.func.isRequired,
    bubbleType: PropTypes.string,
    style: PropTypes.object,
    muteAudio: PropTypes.func,
    audioMuted: PropTypes.bool,
    navigatorState: PropTypes.object,
  };

  state = {
    currentAppState: AppState.currentState,
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (currentAppState) => {
    this.setState({ currentAppState });
  };

  renderMuteButton = () => (
    <TouchableOpacity onPress={this.props.muteAudio}>
      <Text>Hiljennä</Text>
    </TouchableOpacity>
    );

  renderBubbleText = () => {
    const text = this.props.navigatorState.routes[this.props.navigatorState.index].key;

    // Text of the speech bubble is related to selected main activity.
    // maIndex is the index of the selected main activity.
    if (this.props.maIndex || this.props.maIndex === 0) {
      // Text of the speech bubble is related to selected sub activity.
      // saIndex is the index of the selected sub activity.
      if (this.props.saIndex || this.props.saIndex === 0) {
        audiotrack = phrases[text][this.props.maIndex].subTexts[this.props.saIndex].audio;
        return phrases[text][this.props.maIndex].subTexts[this.props.saIndex].subText;
      }

      audiotrack = phrases[text][this.props.maIndex].audio;
      return phrases[text][this.props.maIndex].text;
    }

    audiotrack = phrases[text].audio;
    return phrases[text].text;
  };

  onEnd = () => {
    this.setTimeout(this.props.hideBubble, 2000);
  };

  render() {
    if (this.state.currentAppState !== 'active') {
      console.log('skipping speech bubble in state: ', this.state.currentAppState);
      return null;
    }

    return (
      <TouchableOpacity onPress={this.props.hideBubble}>
        <Image
          source={getImage(this.props.bubbleType)}
          style={[styles.image, getSizeByHeight(this.props.bubbleType, 0.5)]}
        >
          <Text style={styles.text}>
            {this.renderBubbleText()}
          </Text>
          {this.renderMuteButton()}
        </Image>
        {this.props.audioMuted ? null : <AudioPlayerViewContainer onEnd={this.onEnd} audioTrack={audiotrack} />}
      </TouchableOpacity>
    );
  }
}
