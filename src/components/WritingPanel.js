import React, {PropTypes} from 'react';
import {getSize, getImage} from '../services/graphics';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const WritingPanel = React.createClass({

  propTypes: {
    disableWriting: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    phase: PropTypes.string,
    save: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      disabled: true,
      text: ''
    };
  },

  saveText() {
    console.log('LETS SAVE THE TEXT');
    this.props.save(this.props.phase, 'text');
  },

  setText(e) {
    this.setState({text: e.nativeEvent.text});
    this.props.setText(e.nativeEvent.text);

    if (e.nativeEvent.text === '') {
      this.setState({disabled: true});
    }
    else {
      this.setState({disabled: false});
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <Image source={getImage('tausta_kirjoitus')} style={[styles.writingContainer, getSize('tausta_kirjoitus', 0.8)]}>
          <Image source={getImage('kirjoituskentta')} style={[styles.textInput, getSize('kirjoituskentta', 0.65)]}>
            <TextInput
              multiline = {true}
              numberOfLines = {30}
              maxLength = {150}
              onChange = {this.setText}
              underlineColorAndroid = 'transparent'
              style={styles.textForm}/>
          </Image>
        </Image>
        <TouchableOpacity
          disabled={this.state.disabled}
          onPress={this.saveText}
          style={[styles.saveButton, getSize('nappula_tallenna', 0.1), {opacity: 1, backgroundColor: 'white'}]}>
          <Image
            source={getImage('nappula_tallenna')}
            style={[getSize('nappula_tallenna', 0.1),
              {opacity: this.state.disabled ? 0.4 : 1,
              backgroundColor: this.state.disabled ? 'gray' : 'white'}]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.disableWriting} style={[styles.closeButton, getSize('nappula_rasti', 0.4)]}>
          <Image
            source={getImage('nappula_rasti')}
            style={[styles.closeButton, getSize('nappula_rasti', 0.1)]}/>
        </TouchableOpacity>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(184, 184, 184, 0.9)',
    padding: 15
  },
  writingContainer: {

  },
  textInput: {
    marginTop: 30,
    marginLeft: 25,
    marginBottom: 30,
    flex: 1,
    justifyContent: 'flex-start'
  },
  textForm: {
    margin: 15,
    flex: 1,
    fontSize: 20,
    textAlignVertical: 'top'
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    left: 350
  },
  closeButton: {
    flex: 1,
    position: 'absolute',
    right: 5,
    top: 30
  }
});

export default WritingPanel;
