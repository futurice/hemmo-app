import React, {PropTypes} from 'react';
import {getSize, getImage} from '../services/graphics';
import {
  Image,
  View,
  StyleSheet,
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
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.props.restartAudioAndText}>
          <Image source={getImage(this.props.image)} style={getSize(this.props.image, this.props.size)}/>
        </TouchableWithoutFeedback>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    
  }
});

export default Hemmo;
