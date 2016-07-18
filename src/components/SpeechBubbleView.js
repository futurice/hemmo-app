import React, {PropTypes} from 'react';
import SpeechBubble from './SpeechBubble';

import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const SpeechBubbleView = React.createClass({

  propTypes: {
    text: PropTypes.string.isRequired,
    textIndex: PropTypes.number,
    subTextIndex: PropTypes.number,
    hideBubble: PropTypes.func.isRequired,
    position: PropTypes.object.isRequired
  },

  hideBubble() {
    this.props.hideBubble();
  },

  render() {
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.hideBubble}>
        <SpeechBubble
          text={this.props.text}
          position={this.props.position}
          textIndex={this.props.textIndex}
          subTextIndex={this.props.subTextIndex}/>
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
