import React, {PropTypes} from 'react';
import AudioPlayer from './AudioPlayer';

import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

var phrases = require('../../phrases.json');
var bubbleText;

const SpeechBubble = React.createClass({

  propTypes: {
    text: PropTypes.string.isRequired,
    maIndex: PropTypes.number,
    saIndex: PropTypes.number,
    bubbleType: PropTypes.number,
    style: PropTypes.object.isRequired,
    audioTrack: PropTypes.string
  },

  renderBubbleText() {
    //Text of the speech bubble is related to selected main activity.
    //maIndex is the index of the selected main activity.
    if (this.props.maIndex || this.props.maIndex === 0) {
      //Text of the speech bubble is related to selected sub activity.
      //saIndex is the index of the selected sub activity.
      if (this.props.saIndex || this.props.saIndex === 0) {
        return phrases[this.props.text][this.props.maIndex].subTexts[this.props.saIndex].subText;
      }
      else {
        return phrases[this.props.text][this.props.maIndex].text;
      }
    }
    else {
      return phrases[this.props.text];
    }
  },

  render() {

    bubbleText = this.renderBubbleText();

    return (
      <View style={[styles.bubble, {top: this.props.style.top, left: this.props.style.left}]}>
        <Image source={this.props.bubbleType} style={[styles.bubbleText, {height: this.props.style.height, width: this.props.style.width}]}>
          <Text style={[styles.text, {margin: this.props.style.margin}]}>
            {bubbleText}
          </Text>
        </Image>
        {/*<View style={[styles.triangle, {left: this.props.position.triangle}]}/>*/}
        <AudioPlayer audioTrack={this.props.audioTrack}/>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute'
  },
  bubbleText: {
    justifyContent: 'center'
  },
  text: {
    marginTop: 70,
    fontSize: 17,
    textAlign: 'center'
  }
});

export default SpeechBubble;
