import React, {PropTypes} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

import {
  Player,
} from 'react-native-audio-toolkit';

class Hemmo extends React.Component {
  constructor(props) {
    super(props);

    this.player = new Player('drumsticks.mp3');
    this.player.autoDestroy = false;
    this.player.prepare();

    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    this.player.play();
    /*
    setTimeout(() => {
      this.player.currentTime = 15;
    }, 3000);

    setTimeout(() => {
      console.log('stopping');
      this.player.stop();
    }, 6000);
    */
  }

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
};

Hemmo.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};


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
