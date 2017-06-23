/*
 Speech bubble that shows what Hemmo is saying even if the app is muted.
 By clicking the bubble audio can be played again.
*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AudioPlayerViewContainer from '../modules/audioplayer/AudioPlayerViewContainer';
import {getSizeByHeight, getImage} from '../services/graphics';
import TimerMixin from 'react-timer-mixin';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  AppState
} from 'react-native';

const styles = StyleSheet.create({
  touchable: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(184, 184, 184, 0.8)'
  },
  bubble: {
    position: 'absolute'
  },
  bubbleText: {
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Gill Sans'
  }
});

let phrases = require('../data/phrases.json');
let reactMixin = require('react-mixin');
let audiotrack;

@reactMixin.decorate(TimerMixin)
export default class SpeechBubble extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    hemmo: PropTypes.object,
    maIndex: PropTypes.number, // index of the selected main activity
    saIndex: PropTypes.number, // index of the selected sub activity
    hideBubble: PropTypes.func.isRequired,
    bubbleType: PropTypes.string,
    style: PropTypes.object.isRequired
  };

  state = {
    currentAppState: AppState.currentState
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (currentAppState) => {
    this.setState({currentAppState});
  };

  renderBubbleText = () => {
    //Text of the speech bubble is related to selected main activity.
    //maIndex is the index of the selected main activity.
    if (this.props.maIndex || this.props.maIndex === 0) {
      //Text of the speech bubble is related to selected sub activity.
      //saIndex is the index of the selected sub activity.
      if (this.props.saIndex || this.props.saIndex === 0) {
        audiotrack = phrases[this.props.text][this.props.maIndex].subTexts[this.props.saIndex].audio;
        return phrases[this.props.text][this.props.maIndex].subTexts[this.props.saIndex].subText;
      }
      else {
        audiotrack = phrases[this.props.text][this.props.maIndex].audio;
        return phrases[this.props.text][this.props.maIndex].text;
      }
    }
    else {
      audiotrack = phrases[this.props.text].audio;
      return phrases[this.props.text].text;
    }
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
      <TouchableOpacity style={styles.touchable} onPress={this.props.hideBubble}>
        <View
          style={[styles.bubble, {
            top: this.props.style.top,
            right: this.props.style.right,
            left: this.props.style.left}
          ]}>
          <Image
            source={getImage(this.props.bubbleType)}
            style={[styles.bubbleText, getSizeByHeight(this.props.bubbleType, this.props.style.size)]}>
            <Text
              style={[styles.text, {
                marginTop: this.props.style.marginTop,
                margin: this.props.style.margin,
                fontSize: this.props.style.fontSize
              }]}>
              {this.renderBubbleText()}
            </Text>
          </Image>
          <AudioPlayerViewContainer onEnd={this.onEnd} audioTrack={audiotrack}/>
        </View>
        {this.props.hemmo}
      </TouchableOpacity>
    );
  }
}
