import React, {PropTypes} from 'react';
import SpeechBubble from './SpeechBubble';

import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const SpeechBubbleView = React.createClass({

  propTypes: {
    text: PropTypes.string.isRequired,
    maIndex: PropTypes.number, // index of the selected main activity
    saIndex: PropTypes.number, // index of the selected sub activity
    hideBubble: PropTypes.func.isRequired,
    bubbleType: PropTypes.string,
    style: PropTypes.object.isRequired
  },

  hideBubble() {
    this.props.hideBubble();
  },

  render() {
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.hideBubble}>
        <SpeechBubble
          text={this.props.text}
          style={this.props.style}
          hideBubble={this.hideBubble}
          bubbleType={this.props.bubbleType}
          maIndex={this.props.maIndex}
          saIndex={this.props.saIndex}/>
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  touchable: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(184, 184, 184, 0.8)'
  }
});

export default SpeechBubbleView;
