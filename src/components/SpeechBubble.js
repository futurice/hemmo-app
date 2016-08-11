import React, {PropTypes} from 'react';
import AudioPlayer from './AudioPlayer';
import {getSize, getImage} from '../services/graphics';

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
    bubbleType: PropTypes.string,
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
      <View
        style={[styles.bubble, {
          top: this.props.style.top,
          right: this.props.style.right,
          left: this.props.style.left}
        ]}>
        <Image
          source={getImage(this.props.bubbleType)}
          style={[styles.bubbleText, getSize(this.props.bubbleType, this.props.style.size)]}>
          <Text
            style={[styles.text, {
              marginTop: this.props.style.marginTop,
              margin: this.props.style.margin,
              fontSize: this.props.style.fontSize
            }]}>
            {bubbleText}
          </Text>
        </Image>
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
    textAlign: 'center',
    fontFamily: 'Gill Sans'
  }
});

export default SpeechBubble;
