/*
Spinner that appears when page is still loading.
*/

import React, {Component} from 'react';
import Spinner from 'react-native-gifted-spinner';
import {
  View,
  StyleSheet
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
        <Spinner />
      </View>
    );
  }
}
