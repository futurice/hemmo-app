import React, {PropTypes} from 'react';
import Hemmo from './Hemmo';
import SpeechBubble from './SpeechBubble';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

const SaveConfirmationWindow = React.createClass({

  propTypes: {
    closeWindow: PropTypes.func,
    phase: PropTypes.string
  },

  close() {
    this.props.closeWindow(this.props.phase);
  },

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.close}>
        <View style={styles.container}>
          <SpeechBubble
            text={'saved'}
            hideBubble={this.close}
            bubbleType={'puhekupla_tallennettu'}
            style={{top: 110, left: 300, margin: 10, fontSize: 17, size: 0.35}}/>
          <View style={styles.hemmo}>
            <Hemmo image={'hemmo_keski'} size={0.8}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  hemmo: {
    position: 'absolute',
    top: 60,
    left: 80
  }
});

export default SaveConfirmationWindow;
