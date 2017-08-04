import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { getImage } from '../../services/graphics';

const mapDispatchToProps = dispatch => ({
  back: () => dispatch(NavigationActions.back()),
});

const styles = StyleSheet.create({
  backButtonImage: {
    height: 30,
    width: 20,
    marginLeft: 10,
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

@connect(undefined, mapDispatchToProps)
export default class BackButton extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.props.back} style={styles.circle}>
          <Image
            style={styles.backButtonImage}
            source={getImage('nappula_takaisin').normal}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
