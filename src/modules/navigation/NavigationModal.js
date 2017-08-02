/*
Navigation modal on the upper left corner that allows user to return to home page or quit giving feedback
*/

import React, { Component } from 'react';
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Map } from 'immutable';
import {
  getSizeByHeight,
  getSizeByWidth,
  getImage,
} from '../../services/graphics';
import { resetCurrentUser } from '../../state/UserState';

const styles = StyleSheet.create({
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  navigationModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    margin: 20,
  },
  text: {
    alignSelf: 'center',
    fontSize: 25,
    color: '#1E90FF',
    fontFamily: 'Gill Sans',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  currentUser: state.getIn(['user', 'currentUser']),
});

const mapDispatchToProps = dispatch => ({
  navigate: route => dispatch(NavigationActions.navigate({ routeName: route })),
  resetCurrentUser: () => dispatch(resetCurrentUser()),
  resetRoute: () =>
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      }),
    ),
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
    // this.props.resetCurrentUser();
    // this.props.resetRoute();
  };

  quit = () => {
    this.setState({ modalVisible: false });
    // this.props.navigate('Ending');
  };

  renderQuitButton = () =>
    <TouchableOpacity style={styles.button} onPress={this.quit}>
      <Text style={styles.text}>Lopeta</Text>
    </TouchableOpacity>;

  renderChangeUserButton = () =>
    <TouchableOpacity style={styles.button} onPress={this.reset}>
      <Text style={styles.text}>Vaihda käyttäjää</Text>
    </TouchableOpacity>;

  renderCloseButton = () =>
    <TouchableOpacity
      onPress={this.toggleModal}
      style={[styles.closeButton, getSizeByHeight('close_small', 0.1)]}
    >
      <Image
        source={getImage('close_small').normal}
        style={getSizeByHeight('close_small', 0.1)}
      />
    </TouchableOpacity>;

  renderModal = () =>
    this.state.modalVisible
      ? <Modal
          animationType={'fade'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => console.log(' ')}
          supportedOrientations={['portrait', 'landscape']}
        >
          <View style={styles.navigationModal}>
            <Image
              source={getImage('tausta_kapea').normal}
              style={getSizeByWidth('tausta_kapea', 0.5)}
            >
              {this.renderCloseButton()}
              {this.renderChangeUserButton()}
              {this.renderQuitButton()}
            </Image>
          </View>
        </Modal>
      : null;

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.toggleModal} style={styles.circle}>
          <Image
            style={styles.userImage}
            source={
              this.props.currentUser.get('image')
                ? { uri: this.props.currentUser.get('image') }
                : getImage('default_image').normal
            }
          />
        </TouchableOpacity>
        {this.renderModal()}
      </View>
    );
  }
}
