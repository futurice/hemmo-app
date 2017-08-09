/*
Login modal for settings
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  Linking,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { getImage, getSizeByWidth } from '../services/graphics';
import { post } from '../utils/api';
import AppButton from '../components/AppButton';
import { setAuthenticationToken } from '../utils/authentication';

const privacyPolicyURL =
  'https://spiceprogram.org/assets/docs/privacy-policy-hemmo.txt';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  loginContainer: {
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 40,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
  },
  scrollContainer: {},
  formField: {
    marginBottom: 7,
    marginLeft: 60,
    marginRight: 60,
    ...Platform.select({
      ios: {
        paddingBottom: 10,
      },
    }),
  },
  inputView: {
    ...Platform.select({
      ios: {
        borderBottomWidth: 2,
      },
    }),
  },
  input: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    ...Platform.select({
      ios: {
        height: 40,
      },
    }),
  },
  message: {
    color: 'red',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    minHeight: 40,
  },
  label: {
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Roboto-Medium',
    margin: 5,
    fontSize: 17,
  },
  privacyPolicy: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  loginButton: {
    alignSelf: 'center',
  },
  loginText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    color: '#000',
  },
  header: {
    backgroundColor: '#fff',
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: 22,
  },
});

const mapDispatchToProps = dispatch => ({
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
export default class LoginViewContainer extends Component {
  static navigationOptions = {
    title: 'Kirjaudu sisään',
    headerRight: <View />, // Needed for a centered title
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
  };

  static propTypes = {
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
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          keyboardType={'email-address'}
          onChangeText={email => this.setState({ email: email.toLowerCase() })}
          value={this.state.email}
          secureTextEntry={false}
        />
      </View>
    </View>;

  renderPasswordField = () =>
    <View style={styles.formField}>
      <Text style={styles.label}>Salasana</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          keyboardType={'default'}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
        />
      </View>
    </View>;

  renderLoginButton = () =>
    <View style={styles.loginButton}>
      <AppButton
        onPress={this.verifyPassword}
        contentContainerStyle={{ padding: 10 }}
        background="button_small"
        disabled={this.state.loading}
        width={getSizeByWidth('button_small', 0.25).width}
        shadow
      >
        <Text style={styles.loginText}>Kirjaudu</Text>
      </AppButton>
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
      <Image source={getImage('forest').normal} style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={styles.scrollContainer}
          overScrollMode={'always'}
        >
          <View style={styles.loginContainer}>
            {this.renderEmailField()}
            {this.renderPasswordField()}
            {this.renderMessage()}
            {this.renderLoginButton()}
            {this.renderPrivacyPolicyLink()}
          </View>
        </ScrollView>
      </Image>
    );
  }
}
