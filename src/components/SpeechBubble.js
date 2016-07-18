import React, {PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

var phrases = require('../../phrases.json');
var bubbleText;

const SpeechBubble = React.createClass({

  propTypes: {
    text: PropTypes.string.isRequired,
    textIndex: PropTypes.number,
    subTextIndex: PropTypes.number,
    position: PropTypes.object.isRequired
  },

  render() {
    if (this.props.textIndex || this.props.textIndex === 0) {
      if (this.props.subTextIndex || this.props.subTextIndex === 0) {
        bubbleText = phrases[this.props.text][this.props.textIndex].subTexts[this.props.subTextIndex].subText;
      }
      else {
        bubbleText = phrases[this.props.text][this.props.textIndex].text;
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
