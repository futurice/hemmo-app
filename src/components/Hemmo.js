import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSizeByHeight, getImage } from '../services/graphics';
import {
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

export default class Hemmo extends Component {

  static propTypes = {
    image: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    restartAudioAndText: PropTypes.func,
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.restartAudioAndText}>
        <Image
          source={getImage(this.props.image)}
          style={getSizeByHeight(this.props.image, this.props.size)}
        />
      </TouchableWithoutFeedback>
    );
  }
}
