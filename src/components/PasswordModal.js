import React, {PropTypes} from 'react';
import Button from './Button';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

const PasswordModal = React.createClass({

  propTypes: {
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      password: '',
      message: ''
    };
  },

  onClose() {
    this.props.onClose();
  },

  verifyPassword() {
    if (this.state.password === '1234') {
      this.setState({message: ''});
      this.props.onSuccess();
    }
    else {
      this.setState({message: 'Väärä salasana', password: ''});
    }
  },

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Anna salasana
        </Text>

        <Text style={styles.message}>
          {this.state.message}
        </Text>

        <TextInput
          style={styles.password}
          keyboardType={'phone-pad'}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password} secureTextEntry={true}/>

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
  password: {
    width: 300,
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
