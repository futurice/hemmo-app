import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

var text = ' Moikka, kiva kun tulis taas juttelemaan kanssani.\n ' +
  'Nyt voit kertoa siitä, millaista sinulla oli viime kerralla tukiperheessä.\n ' +
  'Olen apunasi alusta loppuun, joten ei huolta, osaat kyllä!';

const SpeechBubble = React.createClass({

  render() {
    return (
      <View style={styles.bubble}>
        <View style={styles.bubbleText}>
          <Text style={styles.text}> {text} </Text>
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
