/*
Spinner that appears when page is still loading.
*/

import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  centered: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default class LoadingSpinner extends Component {
  render() {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
