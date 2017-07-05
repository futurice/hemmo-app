/*
  Image representing an user on the home page.
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { getSizeByWidth, getSizeByHeight, getImage } from '../services/graphics';

const frameSize = getSizeByWidth('kehys_iso', 0.20);
const iconSize = getSizeByWidth('kehys_iso', 0.17).width;

const styles = StyleSheet.create({
  userRow: {
    margin: 10,
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
    alignItems: 'center',
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

  startJourney = (id) => {
    this.props.startJourney(id);
  };

  renderDefaultIconImage = () => (
    <Image
      style={styles.icon}
      source={getImage('default_image')}
    />
    );

  renderIconImage = () => (
    <TouchableHighlight
      onPress={() => this.startJourney(this.props.index)}
    >
      <Image
        style={styles.icon}
        source={this.props.image ? { uri: this.props.image } : getImage('default_image')}
      />
    </TouchableHighlight>
    );

  render() {
    if (this.props.isColumn) {
      return (
        <TouchableHighlight
          style={styles.rowWithSmallImageContainer}
          key={this.props.index}
          onPress={() => this.startJourney(this.props.index)}
        >
          <Image
            source={getImage('kehys_palkki')}
            style={[styles.rowWithSmallImage, getSizeByHeight('kehys_palkki', this.props.rowHeight)]}
          >
            <Image
              style={[styles.smallIcon, { height: this.props.iconHeight - 20, width: this.props.iconHeight - 20 }]}
              source={this.props.image ? { uri: this.props.image } : getImage('default_image')}
            />
            {this.props.name}
          </Image>
        </TouchableHighlight>
      );
    }

    return (
      <Image
        source={getImage('kehys_iso')}
        key={this.props.index}
        style={styles.userRow}
      >
        {this.props.empty ? this.renderDefaultIconImage() : this.renderIconImage()}
        <View style={styles.name}>
          {this.props.name}
        </View>
      </Image>
    );
  }
}
