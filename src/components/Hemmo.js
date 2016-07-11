import React, {PropTypes} from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

const Hemmo = React.createClass({

  propTypes: {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  },

  render() {
    return (
      //TODO: Fix positioning of image (not that important atm)
      <View style={[styles.hemmo, {top: this.props.y, left: this.props.x}]}>
        <Image style={styles.hemmo_img} source={require('../../assets/Hemmo.jpg')}/>
      </View>
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
