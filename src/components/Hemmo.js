import React from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

const SpeechBubble = React.createClass({

  render() {
    return (
      <View style={styles.hemmo}>
        <Image style={styles.hemmo_img} source={require('../../assets/Hemmo.jpg')}/>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  hemmo: {
    position: 'absolute',
    top: 120,
    left: 120
  },
  hemmo_img: {
    width: 100,
    height: 150
  }
});

export default SpeechBubble;
