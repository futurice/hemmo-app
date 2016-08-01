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
    position: PropTypes.object.isRequired,
    audioTrack: PropTypes.string
  },

  render() {
    //Text of the speech bubble is related to selected main activity.
    //maIndex is the index of the selected main activity.
    if (this.props.maIndex || this.props.maIndex === 0) {
      //Text of the speech bubble is related to selected sub activity.
      //saIndex is the index of the selected sub activity.
      if (this.props.saIndex || this.props.saIndex === 0) {
        bubbleText = phrases[this.props.text][this.props.maIndex].subTexts[this.props.saIndex].subText;
      }
      else {
        bubbleText = phrases[this.props.text][this.props.maIndex].text;
      }
    }
    else {
      bubbleText = phrases[this.props.text];
    }

    return (
      <View style={[styles.bubble, {top: this.props.position.x, left: this.props.position.y}]}>
        <Image source={require('../../assets/graphics/1/g113326.png')} style={styles.bubbleText}>
          <Text style={styles.text}> {bubbleText} </Text>
        </Image>
        <View style={[styles.triangle, {left: this.props.position.triangle}]}/>
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
    height: 210,
    width: 370,
    justifyContent: 'center'
  },
  text: {
    fontSize: 15,
    textAlign: 'center'
  }
  // triangle: {
  //   position: 'relative',
  //   width: 0,
  //   height: 0,
  //   borderTopColor: 'black',
  //   borderTopWidth: 26,
  //   borderLeftColor: 'transparent',
  //   borderLeftWidth: 13,
  //   borderRightWidth: 13,
  //   borderRightColor: 'transparent',
  //   borderBottomWidth: 13,
  //   borderBottomColor: 'transparent'
  //}
});

export default SpeechBubble;
