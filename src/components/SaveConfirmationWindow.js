/*
Message window that is shown whenever new user has been added to system
or audio has been successfully recorded and saved,
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hemmo from './Hemmo';
import SpeechBubble from './SpeechBubble';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hemmo: {
    position: 'absolute',
    top: 60,
    left: 80,
  },
});

export default class SaveConfirmationWindow extends Component {

  static propTypes = {
    closeWindow: PropTypes.func.isRequired,
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.closeWindow}>
        <View style={styles.container}>
          <SpeechBubble
            text={'saved'}
            hideBubble={this.props.closeWindow}
            bubbleType={'puhekupla_tallennettu'}
            style={{ top: 110, left: 300, margin: 10, fontSize: 17, size: 0.35 }}
          />
          <View style={styles.hemmo}>
            <Hemmo image={'hemmo_keski'} size={0.8} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
