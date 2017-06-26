/*
Spinner that appears when page is still loading.
*/

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class LoadingSpinner extends Component {
  render() {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }
}
