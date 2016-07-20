import React, {PropTypes} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

import {
  Player,
  Recorder
} from 'react-native-audio-toolkit';

class Hemmo extends React.Component {
  constructor(props) {
    super(props);

    //this.player = new Player('https://fruitiex.org/files/rosanna_128kbit.mp3');
      /*
    this.player.autoDestroy = false;
    this.player.prepare();
    */

    this.recorder = new Recorder('test.mp4', {
      autoDestroy: false
    });

    this.recorder.prepare();

    this._onPress = this._onPress.bind(this);
    this._onLongPress = this._onLongPress.bind(this);
  }

  _onLongPress() {
    console.log('starting record');
    this.recorder.record();
  }

  _onPress() {
    console.log('stopping record');
    this.recorder.stop(() => {
      console.log('playing');
      new Player('test.mp4').play();
    });
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
      <TouchableWithoutFeedback onLongPress={this._onLongPress} onPress={this._onPress}>
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
