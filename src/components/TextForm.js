/*
  Form that allows users to write their feedback instead of recording audio.
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  getSizeByHeight,
  getSizeByWidth,
  getImage,
} from '../services/graphics';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(184, 184, 184, 0.9)',
    padding: 15,
  },
  textInput: {
    marginTop: 30,
    marginLeft: 25,
    marginBottom: 30,
    justifyContent: 'flex-start',
  },
  textForm: {
    margin: 15,
    flex: 1,
    fontSize: 20,
    fontFamily: 'Gill Sans',
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 5,
    opacity: 1,
    backgroundColor: 'white',
  },
  closeButton: {
    flex: 1,
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default class TextForm extends Component {
  static propTypes = {
    toggleWriting: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
  };

  state = {
    disabled: true,
    text: '',
  };

  setText = e => {
    this.setState({ text: e.nativeEvent.text });
    this.props.setText(e.nativeEvent.text);

    this.setState({
      disabled: e.nativeEvent.text === '',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={getImage('tausta_kirjoitus')}
          style={getSizeByWidth('tausta_kirjoitus', 0.5)}
        >
          <Image
            source={getImage('kirjoituskentta')}
            style={[styles.textInput, getSizeByWidth('kirjoituskentta', 0.35)]}
          >
            <TextInput
              multiline
              numberOfLines={30}
              maxLength={500}
              onChange={this.setText}
              underlineColorAndroid="transparent"
              style={styles.textForm}
            />
          </Image>
          <TouchableOpacity
            onPress={this.props.toggleWriting}
            style={styles.closeButton}
          >
            <Image
              source={getImage('nappula_rasti')}
              style={getSizeByHeight('nappula_rasti', 0.1)}
            />
          </TouchableOpacity>
        </Image>
        <TouchableOpacity
          disabled={this.state.disabled}
          onPress={() => this.props.save('text')}
          style={styles.saveButton}
        >
          <Image
            source={getImage('nappula_tallenna')}
            style={[
              getSizeByHeight('nappula_tallenna', 0.1),
              {
                opacity: this.state.disabled ? 0.1 : 1,
                backgroundColor: this.state.disabled ? 'gray' : 'white',
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
