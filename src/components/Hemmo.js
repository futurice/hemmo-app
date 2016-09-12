import React, {PropTypes} from 'react';
import {getSizeByHeight, getImage} from '../services/graphics';
import {
  Image,
  TouchableWithoutFeedback
} from 'react-native';

const Hemmo = React.createClass({

  propTypes: {
    image: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    restartAudioAndText: PropTypes.func
  },

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.restartAudioAndText}>
        <Image
          source={getImage(this.props.image)}
          style={getSizeByHeight(this.props.image, this.props.size)}/>
      </TouchableWithoutFeedback>
    );
  }
});

export default Hemmo;
