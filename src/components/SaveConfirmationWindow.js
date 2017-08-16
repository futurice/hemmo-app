/*
Message window that is shown whenever new user has been added to system
or audio has been successfully recorded and saved,
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimerMixin from 'react-timer-mixin';
import { connect } from 'react-redux';
import { View, StyleSheet, Modal } from 'react-native';
import { getSizeByHeight } from '../services/graphics';
import { setAudio } from '../state/HemmoState';
import AppButton from './AppButton';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  textAndCheckmark: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const reactMixin = require('react-mixin');
const phrases = require('../data/phrases');

const mapDispatchToProps = dispatch => ({
  setAudio: audio => dispatch(setAudio(audio)),
});

@connect(null, mapDispatchToProps)
@reactMixin.decorate(TimerMixin)
export default class SaveConfirmationWindow extends Component {
  static propTypes = {
    closeWindow: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    setAudio: PropTypes.func.isRequired,
  };

  async componentDidUpdate() {
    if (this.props.visible) {
      await this.props.setAudio(phrases.saved.audio);
      this.setTimeout(this.props.closeWindow, 2000);
    }
  }

  closeWindow = async () => {
    await this.props.setAudio('');
    await this.props.closeWindow();
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'fade'}
          transparent
          visible={this.props.visible}
          onRequestClose={this.closeWindow}
          supportedOrientations={['portrait', 'landscape']}
        >
          <View style={styles.modal}>
            <AppButton
              background="saved"
              onPress={this.closeWindow}
              height={getSizeByHeight('saved', 0.6).height}
              shadow
            />
          </View>
        </Modal>
      </View>
    );
  }
}
