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
    setText: PropTypes.func.isRequired
  },

  render() {

    return (
      <View style={styles.writingContainer}>
        <View style={styles.textInput}>
          <TextInput
            multiline = {true}
            numberOfLines = {30}
            maxLength = {150}
            onChange = {this.props.setText}
            underlineColorAndroid = 'transparent'
            style={styles.textForm}/>
        </View>
        <TouchableOpacity onPress={this.props.disableWriting} style={styles.closeButton}>
          <Image
            source={getImage('nappula_rasti')}
            style={[styles.closeButton, getSize('nappula_rasti', 0.1)]}/>
        </TouchableOpacity>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  writingContainer: {
    position: 'absolute',
    backgroundColor: 'rgb(177, 177, 177)',
    borderWidth: 2,
    borderRadius: 30,
    top: 20,
    left: 20,
    right: 20,
    bottom: 60,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 80
  },
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderWidth: 3,
    borderColor: 'gray',
    justifyContent: 'flex-start'
  },
  textForm: {
    margin: 15,
    flex: 1,
    fontSize: 20,
    textAlignVertical: 'top'
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});

export default WritingPanel;
