import React, {PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import {
  Player
} from 'react-native-audio-toolkit';

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

  componentWillMount() {
    // var track = this.props.audioTrack + '.mp3';
    this.player = new Player('longer.mp3').prepare();
    console.log('this.player.path ' + JSON.stringify(this.player.state));
  },

  componentDidMount() {
    this.player.play();
  },

  componentWillUnmount() {
    this.player.destroy();
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
        <View style={styles.bubbleText}>
          <Text style={styles.text}> {bubbleText} </Text>
        </View>
        <View style={[styles.triangle, {left: this.props.position.triangle}]}/>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute'
  },
  bubbleText: {
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 10
  },
  text: {
    fontSize: 15,
    textAlign: 'center'
  },
  triangle: {
    position: 'relative',
    width: 0,
    height: 0,
    borderTopColor: 'black',
    borderTopWidth: 26,
    borderLeftColor: 'transparent',
    borderLeftWidth: 13,
    borderRightWidth: 13,
    borderRightColor: 'transparent',
    borderBottomWidth: 13,
    borderBottomColor: 'transparent'
  }
});

export default SpeechBubble;
