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

import { post } from '../utils/api';
import { setAuthenticationToken } from '../utils/authentication';

const privacyPolicyURL =
  'https://spiceprogram.org/assets/docs/privacy-policy-hemmo.txt';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {},
  formField: {
    marginTop: 10,
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'rgba(65,65,65,1)',
        backgroundColor: 'rgba(209, 209, 209, 0.29)',
      },
    }),
  },
  message: {
    color: 'red',
    textAlign: 'center',
    minHeight: 40,
  },
  label: {
    textAlign: 'center',
    margin: 5,
    fontSize: 17,
  },
  privacyPolicy: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
  },
  loginButton: {
    alignSelf: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(NavigationActions.back()),
  onSuccess: () =>
    dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
          NavigationActions.navigate({ routeName: 'Settings' }),
        ],
      }),
    ),
});

@connect(undefined, mapDispatchToProps)
export default class LoginModal extends Component {
  static navigationOptions = {
    title: 'Kirjaudu sisään',
    headerStyle: { backgroundColor: '#FFFFFF' },
  };

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
    Linking.openURL(privacyPolicyURL).catch(err =>
      console.error('An error occurred', err),
    );
  };

  verifyPassword = async () => {
    if (this.state.loading) {
      return;
    }

    this.setState({
      loading: true,
      message: 'Kirjaudutaan...',
    });

    try {
      const result = await post('/admin/employees/authenticate', {
        email: this.state.email,
        password: this.state.password,
      });

      this.setState({
        loading: false,
        message: '',
      });

      await setAuthenticationToken(result.token);
      this.props.onSuccess();
    } catch (error) {
      console.log(`error ${error}`);

      this.setState({
        loading: false,
        message:
          'Virhe sisäänkirjautumisessa, tarkista salasana ja internetyhteys',
      });
    }
  };

  renderEmailField = () =>
    <View style={styles.formField}>
      <Text style={styles.label}>Sähköpostiosoite</Text>
      <TextInput
        style={styles.input}
        keyboardType={'email-address'}
        onChangeText={email => this.setState({ email: email.toLowerCase() })}
        value={this.state.email}
        secureTextEntry={false}
      />
    </View>;

  renderPasswordField = () =>
    <View style={styles.formField}>
      <Text style={styles.label}>Salasana</Text>
      <TextInput
        style={styles.input}
        keyboardType={'default'}
        onChangeText={password => this.setState({ password })}
        value={this.state.password}
        secureTextEntry
      />
    </View>;

  renderLoginButton = () =>
    <View style={styles.loginButton}>
      <Button
        color={'#1E90FF'}
        title={'Kirjaudu'}
        onPress={this.verifyPassword}
        disabled={this.state.loading}
      />
    </View>;

  renderMessage = () =>
    <Text style={styles.message}>
      {this.state.message}
    </Text>;

  renderPrivacyPolicyLink = () =>
    <Text style={styles.privacyPolicy} onPress={this.openPrivacyPolicy}>
      Tietosuojakäytäntö
    </Text>;

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={styles.scrollContainer}
          overScrollMode={'always'}
        >
          {this.renderEmailField()}
          {this.renderPasswordField()}
          {this.renderMessage()}
          {this.renderLoginButton()}
          {this.renderPrivacyPolicyLink()}
        </ScrollView>
      </View>
    );
  }
}
