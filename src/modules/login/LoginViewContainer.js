/*
Login modal for settings
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import {
  Button,
  View,
  ScrollView,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';

import { post } from '../../utils/api';
import { setAuthenticationToken } from '../../utils/authentication';

const privacyPolicyURL = 'https://spiceprogram.org/assets/docs/privacy-policy-hemmo.txt';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(233, 233, 233, 0.93)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  scrollContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flexGrow: 1,
    padding: 16,
  },
  buttonContainer: {
    paddingVertical: 8,
    alignSelf: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  passwordView: {
    alignItems: 'center',
  },
  email: {
    ...Platform.select({
      ios: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'rgba(209, 209, 209, 0.59)',
      },
    }),
    textAlign: 'center',
  },
  password: {
    ...Platform.select({
      ios: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'rgba(209, 209, 209, 0.59)',
      },
    }),
    textAlign: 'center',
  },
  message: {
    color: 'red',
    textAlign: 'center',
    minHeight: 40,
  },
  text: {
    fontSize: 17,
    textAlign: 'center',
  },
  privpolicy: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(NavigationActions.back()),
  onSuccess: () => dispatch(NavigationActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({ routeName: 'Home' }),
      NavigationActions.navigate({ routeName: 'Settings' }),
    ],
  })),
});

@connect(undefined, mapDispatchToProps)
export default class LoginModal extends Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
  };

  state = {
    email: __DEV__ ? 'foo@bar.com' : '',
    password: __DEV__ ? 'foobar' : '',
    message: '',
    loading: false,
  };

  openPrivacyPolicy = () => {
    Linking.openURL(privacyPolicyURL).catch(err => console.error('An error occurred', err));
  };

  verifyPassword = () => {
    if (this.state.loading) {
      return;
    }

    this.setState({
      loading: true,
      message: 'Kirjaudutaan...',
    });

    post('/admin/employees/authenticate', {
      email: this.state.email,
      password: this.state.password,
    })
    .then(
      (result) => {
        this.setState({
          loading: false,
          message: '',
        });
        setAuthenticationToken(result.token)
        .then(() => {
          this.props.onSuccess();
        });
      },
    )
    .catch((error) => {
      console.log(`error ${error}`);
      this.setState({
        loading: false,
        message: 'Virhe sisäänkirjautumisessa, tarkista salasana ja internetyhteys',
      });
    });
  };

  renderEmailFieldTitle = () => (
    <Text style={styles.text}>
      Syötä sähköpostiosoite
    </Text>
  );

  renderEmailField = () => (
    <TextInput
      style={styles.email}
      keyboardType={'email-address'}
      onChangeText={email => this.setState({ email: email.toLowerCase() })}
      value={this.state.email}
      secureTextEntry={false}
    />
  );

  renderPasswordFieldTitle = () => (
    <Text style={styles.text}>
      Syötä salasana
    </Text>
  );

  renderPasswordField = () => (
    <TextInput
      style={styles.password}
      keyboardType={'default'}
      onChangeText={password => this.setState({ password })}
      value={this.state.password}
      secureTextEntry
    />
  );

  renderLoginButton = () => (
    <View style={styles.buttonContainer}>
      <Button
        color={'rgb(127, 192, 194)'}
        title={'Kirjaudu'}
        onPress={this.verifyPassword}
        disabled={this.state.loading}
      />
    </View>
  );

  renderMessage = () => (
    <Text style={styles.message}>
      {this.state.message}
    </Text>
  );

  renderCancelButton = () => (
    <View style={styles.buttonContainer}>
      <Button
        color={'rgb(64, 127, 127)'}
        title={'Peruuta'}
        onPress={this.props.onClose}
        disabled={this.state.loading}
      />
    </View>
  );

  renderPrivacyPolicyLink = () => (
    <Text
      style={styles.privpolicy}
      onPress={this.openPrivacyPolicy}
    >
      Tietosuojakäytäntö
    </Text>
  );

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={styles.scrollContainer}
          overScrollMode={'always'}
        >
          {this.renderEmailFieldTitle()}
          {this.renderEmailField()}
          {this.renderPasswordFieldTitle()}
          {this.renderPasswordField()}
          {this.renderMessage()}
          {this.renderLoginButton()}
          {this.renderCancelButton()}
          {this.renderPrivacyPolicyLink()}
        </ScrollView>
      </View>
    );
  }
}
