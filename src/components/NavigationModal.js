/*
Navigation modal on the upper left corner that allows user to return to home page or quit giving feedback
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { getSizeByHeight, getSizeByWidth, getImage } from '../services/graphics';
import { save, formRequestBody } from '../services/save';
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 2,
    top: 2,
  },
  circle: {
    backgroundColor: 'white',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  image: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(184, 184, 184, 0.9)',
  },
  upperModal: {
    flex: 1,
    margin: 50,
    marginHorizontal: 100,
    flexDirection: 'row',
  },
  closeButton: {
    flex: 1,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  modal: {
    flex: 1,
    margin: 10,
    borderWidth: 4,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  font: {
    fontSize: 25,
    fontFamily: 'Gill Sans',
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    alignItems: 'center',
  },
});

export default class NavigationModal extends Component {

  static propTypes = {
    reset: PropTypes.func.isRequired,
    quit: PropTypes.func.isRequired,
    shouldSave: PropTypes.bool,
    phase: PropTypes.string,
    currentUser: PropTypes.instanceOf(Map),
  };

  state = {
    modalVisible: false,
  };

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  reset = () => {
    if (this.props.shouldSave) {
      this.save();
    }

    this.props.reset();
  };

  quit = () => {
    if (this.props.shouldSave) {
      this.save();
    }

    this.setState({ modalVisible: false });
    this.props.quit();
  };

  save = () => {
    formRequestBody(
      this.props.phase,
      'skipped', 'Ohitettu',
      this.props.currentUser.get('activityIndex'),
      this.props.currentUser.get('answers'))
        .then(body => save(null, 'skipped', body));
  };

  renderQuitButton = () => (
    <TouchableHighlight style={styles.highlight} onPress={this.quit}>
      <Image
        source={getImage('kehys_palkki')}
        style={[getSizeByWidth('kehys_palkki', 0.5), styles.row]}
      >
        <Text style={styles.font}>Lopeta</Text>
      </Image>
    </TouchableHighlight>
    );

  renderChangeUserButton = () => (
    <TouchableHighlight style={styles.highlight} onPress={this.reset}>
      <Image
        source={getImage('kehys_palkki')}
        style={[getSizeByWidth('kehys_palkki', 0.5), styles.row]}
      >
        <Text style={styles.font}>Vaihda käyttäjää</Text>
      </Image>
    </TouchableHighlight>
    );

  renderCloseButton = () => (
    <TouchableOpacity
      onPress={this.toggleModal}
      style={[styles.closeButton, getSizeByHeight('nappula_rasti', 0.1)]}
    >
      <Image
        source={getImage('nappula_rasti')}
        style={[getSizeByHeight('nappula_rasti', 0.1)]}
      />
    </TouchableOpacity>
    );

  renderModal = () => this.state.modalVisible ? (
    <Modal
      animationType={'fade'}
      transparent
      visible={this.state.modalVisible}
      onRequestClose={() => console.log(' ')}
      supportedOrientations={['portrait', 'landscape']}
    >
      <View style={styles.modalContainer}>
        <View style={styles.upperModal}>
          <View style={styles.modal}>
            {this.renderChangeUserButton()}
            {this.renderQuitButton()}
          </View>
          {this.renderCloseButton()}
        </View>
      </View>
    </Modal>
    ) : null;

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleModal} style={styles.circle}>
          <Image style={styles.image} source={{ uri: this.props.currentUser.get('image') }} />
        </TouchableOpacity>
        {this.renderModal()}
      </View>
    );
  }
}
