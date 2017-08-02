/*
Message window that is shown whenever new user has been added to system
or audio has been successfully recorded and saved,
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimerMixin from 'react-timer-mixin';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { getSizeByWidth, getImage } from '../services/graphics';
import { setAudio } from '../state/HemmoState';

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

  async componentDidUpdate(prevProps) {
    if (this.props.visible) {
      await this.props.setAudio('hemmo_43');
    }
  }

  closeWindow = async () => {
    await this.props.setAudio('');
    this.props.closeWindow();
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'fade'}
          transparent
          visible={this.props.visible}
          onRequestClose={() => {}}
          supportedOrientations={['portrait', 'landscape']}
        >
          <View style={styles.modal}>
            <TouchableOpacity onPress={this.closeWindow}>
              <Image
                source={getImage('modal').shadow}
                style={getSizeByWidth('modal', 0.3)}
              >
                <View style={styles.textAndCheckmark}>
                  <Image
                    source={getImage('valittu_iso').normal}
                    style={[
                      styles.checkmark,
                      getSizeByWidth('valittu_iso', 0.13),
                    ]}
                  />
                  <Text style={styles.text}>Tallennettu!</Text>
                </View>
              </Image>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
