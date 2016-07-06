import React, {PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const SpeechBubble = React.createClass({

  propTypes: {
    text: PropTypes.string.isRequired
  },

  render() {
    return (
      <View style={styles.bubble}>
        <View style={styles.bubbleText}>
          <Text style={styles.text}> {this.props.text} </Text>
        </View>
        <View style={styles.triangle}/>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    top: 20,
    left: 100
  },
  bubbleText: {
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 10
  },
  text: {
    fontSize: 10
  },
  triangle: {
    position: 'relative',
    left: 70,
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
