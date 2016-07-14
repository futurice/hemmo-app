import React, {PropTypes} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

import {
  RCTAudioPlayer
} from 'react-native-audio-toolkit';

const Hemmo = React.createClass({

  propTypes: {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  },

  _onPress: () => {
    console.log();
    RCTAudioPlayer.play('drumsticks.mp3', {
      resource: true
    }, () => {
        console.log('callback');
    });
  },

  render() {
    return (
      //TODO: Fix positioning of image (not that important atm)
      <TouchableWithoutFeedback onPressIn={this._onPress}>
        <View style={[styles.hemmo, {top: this.props.y, left: this.props.x}]}>
          <Image style={styles.hemmo_img} source={require('../../assets/Hemmo.jpg')}/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

const styles = StyleSheet.create({
  hemmo: {
    position: 'absolute'
  },
  hemmo_img: {
    width: 100,
    height: 150
  }
});

export default Hemmo;
