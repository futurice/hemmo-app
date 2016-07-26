import React, {PropTypes} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

// import {
//   Player,
//   Recorder,
//   MediaStates
// } from 'react-native-audio-toolkit';

class Hemmo extends React.Component {
  constructor(props) {
    super(props);

    // this.player = new Player('testsound.mp3').prepare();
    // this._onPress = this._onPress.bind(this);
  }

  // componentDidMount() {
  //   this.player.play();
  // }

  render() {
    return (
      //TODO: Fix positioning and sizing of image (not that important atm)
      <TouchableWithoutFeedback>
        <View style={[styles.hemmo, {top: this.props.y, left: this.props.x}]}>
          <Image style={styles.hemmo_img} source={require('../../assets/Hemmo.jpg')}/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

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
