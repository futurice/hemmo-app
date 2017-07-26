/*
Message window that is shown whenever new user has been added to system
or audio has been successfully recorded and saved,
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimerMixin from 'react-timer-mixin';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getSizeByWidth, getImage } from '../services/graphics';
import { setAudio } from '../state/HemmoState';

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
  content: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    borderWidth: 2,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
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
    setAudio: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.setAudio('hemmo_43');
    this.setTimeout(this.props.closeWindow, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.content}>
          <Image
            source={getImage('valittu')}
            style={getSizeByWidth('valittu', 0.05)}
          />
          <Text style={styles.text}>Tallennettu!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
