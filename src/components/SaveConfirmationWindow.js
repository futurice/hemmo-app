/*
Message window that is shown whenever new user has been added to system
or feedback has been successfully saved
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { View, StyleSheet, Modal } from 'react-native';
import { getSizeByHeight } from '../services/graphics';
import { setAudio, setText } from '../state/HemmoState';
import { hideSaveModal } from '../state/SessionState';
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

const phrases = require('../data/phrases');

const mapStateToProps = state => ({
  saveModalVisible: state.getIn(['session', 'saveModalVisible']),
  freeWordKey: state.getIn(['navigatorState', 'routes', 2, 'key']),
  activeRoute: state.getIn([
    'navigatorState',
    'routes',
    state.getIn(['navigatorState', 'index']),
    'routeName',
  ]),
});

const mapDispatchToProps = dispatch => ({
  setAudio: audio => dispatch(setAudio(audio)),
  hideSaveModal: () => dispatch(hideSaveModal()),
  back: key => {
    dispatch(setText(''));
    dispatch(setAudio(''));
    dispatch(NavigationActions.back({ key }));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SaveConfirmationWindow extends Component {
  static propTypes = {
    hideSaveModal: PropTypes.func.isRequired,
    saveModalVisible: PropTypes.bool.isRequired,
    setAudio: PropTypes.func.isRequired,
    back: PropTypes.func.isRequired,
    activeRoute: PropTypes.string.isRequired,
    freeWordKey: PropTypes.string,
  };

  componentDidUpdate() {
    if (this.props.saveModalVisible) {
      this.props.setAudio(phrases.saved.audio);
      setTimeout(this.closeWindow, 2000);
    }
  }

  closeWindow = () => {
    if (this.props.saveModalVisible) {
      if (
        this.props.activeRoute === 'Mood' ||
        this.props.activeRoute === 'Activity'
      ) {
        this.props.back();
      } else if (
        this.props.activeRoute === 'Record' ||
        this.props.activeRoute === 'Write'
      ) {
        this.props.back(this.props.freeWordKey);
      }

      this.props.hideSaveModal();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'fade'}
          transparent
          visible={this.props.saveModalVisible}
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
