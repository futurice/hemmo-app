/*
  Image representing an user on the home page.
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { getSizeByWidth, getImage } from '../services/graphics';

const frameSize = getSizeByWidth('profile_card', 0.5);
const iconSize = getSizeByWidth('profile_card', 0.4).width;

const styles = StyleSheet.create({
  userRow: {
    margin: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: frameSize.height,
    width: frameSize.width,
  },
  icon: {
    height: iconSize,
    width: iconSize,
  },
  smallIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  rowWithSmallImageContainer: {
    margin: 2,
    backgroundColor: 'white',
  },
  rowWithSmallImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    width: iconSize,
    textAlign: 'center',
    fontSize: 17,
    padding: 10,
  },
});

export default class UserItem extends Component {
  static propTypes = {
    name: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    empty: PropTypes.bool.isRequired,
    startJourney: PropTypes.func,
    image: PropTypes.string,
    isColumn: PropTypes.bool,
    rowHeight: PropTypes.number,
    iconHeight: PropTypes.number,
  };

  startJourney = id => {
    this.props.startJourney(id);
  };

  renderDefaultIconImage = () =>
    <Image style={styles.icon} source={getImage('profilephoto').normal} />;

  renderIconImage = () =>
    <TouchableOpacity onPress={() => this.startJourney(this.props.index)}>
      <Image
        style={styles.icon}
        source={
          this.props.image
            ? { uri: this.props.image }
            : getImage('profilephoto').normal
        }
      />
    </TouchableOpacity>;

  render() {
    return (
      <View key={this.props.index} style={styles.userRow}>
        {this.props.empty
          ? this.renderDefaultIconImage()
          : this.renderIconImage()}
        <Text style={styles.name}>
          {this.props.name}
        </Text>
      </View>
    );
  }
}
