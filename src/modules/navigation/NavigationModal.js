/*
Navigation modal on the upper left corner that allows user to return to home page or quit giving feedback
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { getSizeByHeight, getSizeByWidth, getImage } from '../../services/graphics';
import { NavigationActions } from 'react-navigation';
import { resetCurrentUser, saveAnswer } from '../user/UserState';
import { save, formRequestBody } from '../../services/save';
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
  image: {
    height: 40,
    width: 40,
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

const mapStateToProps = state => ({
  currentUser: state.getIn(['user', 'currentUser']),
});

const mapDispatchToProps = dispatch => ({
  navigate: route => dispatch(NavigationActions.navigate({ routeName: route })),
  saveAnswer: (index, destination, answers) => dispatch(saveAnswer(index, destination, answers)),
  resetCurrentUser: () => dispatch(resetCurrentUser()),
  resetRoute: () => dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Home' }),
    ],
  })),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class NavigationModal extends Component {

  static propTypes = {
    resetRoute: PropTypes.func.isRequired,
    resetCurrentUser: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    currentUser: PropTypes.instanceOf(Map).isRequired,
  };

  state = {
    modalVisible: false,
  };

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  reset = () => {
    this.save();
    this.props.resetCurrentUser();
    this.props.resetRoute();
  };

  quit = () => {
    this.save();
    this.setState({ modalVisible: false });
    this.props.navigate('Ending');
  };

  save = () => {
    formRequestBody(
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
          <Image
            style={styles.image}
            source={this.props.currentUser.get('image') ? { uri: this.props.currentUser.get('image') } : getImage('default_image')}
          />
        </TouchableOpacity>
        {this.renderModal()}
      </View>
    );
  }
}
