/*
Customized button class
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
  },
});

export default class Button extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    style: PropTypes.number.isRequired,
    highlightStyle: PropTypes.number.isRequired,
  };

  renderIcon = () => this.props.icon !== '' ? (
    <Icon size={25} name={this.props.icon} />
    ) : null;

  render() {
    return (
      <View style={this.props.style}>
        <TouchableHighlight
          onPress={this.props.onPress}
          style={this.props.highlightStyle}
        >
          <View style={styles.button}>
            <Text style={styles.text}>
              {this.props.text}
            </Text>
            {this.renderIcon()}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
