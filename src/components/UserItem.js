import React, {PropTypes} from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import {getSizeByHeight, getSizeByWidth, getImage} from '../services/graphics';

const UserItem = React.createClass({

  propTypes: {
    name: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    empty: PropTypes.bool.isRequired,
    startJourney: PropTypes.func,
    image: PropTypes.string
  },

  startJourney(id) {
    this.props.startJourney(id);
  },

  render() {
    var image;

    if (this.props.empty === false) {
      image = (
        <TouchableHighlight
          onPress={this.startJourney.bind(this, this.props.index)}>
          <Image
            style={styles.icon}
            source={{uri: this.props.image}}/>
        </TouchableHighlight>
      );
    }
    else {
      image = (
        <Image
          style={styles.icon}
          source={getImage('default_image')}/>
      );
    }

    return (
      <Image
        source={getImage('kehys_iso')}
        key={this.props.index}
        style={styles.userRow}>
          {image}
        <View style={styles.name}>
          {this.props.name}
        </View>
      </Image>
    );
  }
});

var frameSize = getSizeByWidth('kehys_iso', 0.20);
var iconSize = getSizeByWidth('kehys_iso', 0.17).width;

const styles = StyleSheet.create({
  userRow: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: frameSize.height,
    width: frameSize.width
  },
  icon: {
    height: iconSize,
    width: iconSize
  },
  name: {
    width: iconSize,
    alignItems: 'center'
  }
});

export default UserItem;
