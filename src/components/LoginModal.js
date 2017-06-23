/*
Login modal for settings
*/

import React, {PropTypes, Component} from 'react';
import Button from './Button';
import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  Linking
} from 'react-native';
import {post} from '../utils/api';
import {setAuthenticationToken} from '../utils/authentication';

const privacyPolicyURL = 'https://spiceprogram.org/assets/docs/privacy-policy-hemmo.txt';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(233, 233, 233, 0.93)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  passwordView: {
    alignItems: 'center'
  },
  email: {
    width: 300,
    ...Platform.select({
      ios: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'rgba(209, 209, 209, 0.59)'
      }
    }),
    textAlign: 'center'
  },
  password: {
    width: 300,
    ...Platform.select({
      ios: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'rgba(209, 209, 209, 0.59)'
      }
    }),
    textAlign: 'center'
  },
  message: {
    color: 'red'
  },
  loginButton: {
    backgroundColor: 'rgb(127, 192, 194)',
    borderRadius: 10,
    margin: 20,
    width: 150
  },
  text: {
    fontSize: 17
  },
  privpolicy: {
    marginTop: 20,
    fontSize: 14
  },
  buttonHighlight: {
    borderRadius: 10
  }
});

export default class LoginModal extends Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
  };

  state = {
    email: '',
    password: '',
    message: ''
  };

  openPrivacyPolicy = () => {
    Linking.openURL(privacyPolicyURL).catch(err => console.error('An error occurred', err));
  };

  verifyPassword = () => {
    this.setState({message: 'Kirjaudutaan...'});

    post('/employees/authenticate', {
      email: this.state.email,
      password: this.state.password
    })
    .then(
      result => {
        this.setState({message: ''});
        setAuthenticationToken(result.token)
        .then(() => {
          this.props.onSuccess();
        });
      }
    )
    .catch(error => {
      console.log('error ' + error);
      this.setState({message: 'Virhe sisäänkirjautumisessa, tarkista salasana ja internetyhteys'});
    });
  };

  renderEmailFieldTitle = () => {
    return (
      <Text style={styles.text}>
        Syötä sähköpostiosoite
      </Text>
    );
  };

  renderEmailField = () => {
    return (
      <View style={styles.passwordView}>
        <TextInput
          style={styles.email}
          keyboardType={'email-address'}
          onChangeText={(email) => this.setState({email: email.toLowerCase()})}
          value={this.state.email}
          secureTextEntry={false}/>
      </View>
    );
  };

  renderPasswordFieldTitle = () => {
    return (
      <Text style={styles.text}>
        Syötä salasana
      </Text>
    );
  };

  renderPasswordField = () => {
    return (
      <View style={styles.passwordView}>
        <TextInput
          style={styles.password}
          keyboardType={'default'}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry={true}/>
      </View>
    );
  };

  renderLoginButton = () => {
    return (
      <Button
        style={styles.loginButton}
        highlightStyle={styles.buttonHighlight}
        onPress={this.verifyPassword}
        text={'Kirjaudu'}
        icon={''}
      />
    );
  };

  renderMessage = () => {
    return (
      <Text style={styles.message}>
        {this.state.message}
      </Text>
    );
  };

  renderCancelButton = () => {
    return (
      <Text style={styles.text} onPress={this.props.onClose}>
        Peruuta
      </Text>
    );
  };

  renderPrivacyPolicyLink = () => {
    return (
      <Text
        style={styles.privpolicy}
        onPress={this.openPrivacyPolicy}>

        Tietosuojakäytäntö
      </Text>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderEmailFieldTitle()}
        {this.renderEmailField()}
        {this.renderPasswordFieldTitle()}
        {this.renderPasswordField()}
        {this.renderMessage()}
        {this.renderLoginButton()}
        {this.renderCancelButton()}
        {this.renderPrivacyPolicyLink()}
      </View>
    );
  }
}
