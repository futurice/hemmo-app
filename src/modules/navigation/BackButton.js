import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import AppButton from '../../components/AppButton';

const mapDispatchToProps = dispatch => ({
  back: () => {
    dispatch(NavigationActions.back());
  },
});

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 5,
  },
});

@connect(undefined, mapDispatchToProps)
export default class BackButton extends Component {
  render() {
    return (
      <View style={styles.backButton}>
        <AppButton
          background="back"
          onPress={this.props.back}
          height={Platform.OS === 'android' ? 50 : 40}
        />
      </View>
    );
  }
}
