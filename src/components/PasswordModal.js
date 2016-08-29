import React, {PropTypes} from 'react';
import Button from './Button';
import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet
} from 'react-native';
import {post} from '../utils/api';
import {setAuthenticationToken} from '../utils/authentication';

const PasswordModal = React.createClass({

  propTypes: {
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      email: '',
      password: '',
      message: ''
    };
  },

  onClose() {
    this.props.onClose();
  },

  verifyPassword() {
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
      this.setState({message: 'Virhe sisäänkirjautumisessa, tarkista salasana ja Internetyhteys'});
    });
  },

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Syötä sähköpostiosoite
        </Text>

        <View style={styles.passwordView}>
          <TextInput
            style={styles.email}
            keyboardType={'email-address'}
            onChangeText={(email) => this.setState({email: email.toLowerCase()})}
            value={this.state.email}
            secureTextEntry={false}/>
        </View>

        <Text style={styles.text}>
          Syötä salasana
        </Text>
        <View style={styles.passwordView}>
          <TextInput
            style={styles.password}
            keyboardType={'default'}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            secureTextEntry={true}/>
        </View>

        <Text style={styles.message}>
          {this.state.message}
        </Text>

        <Button
          style={styles.loginButton} highlightStyle={styles.buttonHighlight}
          onPress={this.verifyPassword} text={'Kirjaudu'} icon={''}/>

        <Text style={styles.text} onPress={this.onClose}>
          Peruuta
        </Text>
      </View>
    );
  }
});

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
  buttonHighlight: {
    borderRadius: 10
  }
});

export default PasswordModal;
