import React, {PropTypes} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  TextInput,
  StyleSheet
} from 'react-native';

const WritingView = React.createClass({

  propTypes: {
    disableWriting: PropTypes.func.isRequired
  },
  disableWriting() {
    this.props.disableWriting();
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textInput}>
          <TextInput
            multiline = {true}
           numberOfLines = {7}
            maxLength={150}/>
        </View>
        <Icon onPress={this.disableWriting} name='times-circle' size={40} style={styles.closeButton}/>

      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    top: 20,
    left: 20,
    right: 20,
    bottom: 60,
    paddingTop: 40,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 80
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'stretch'
  },
  closeButton: {
    color: 'green',
    position: 'absolute',
    top: 20,
    right: 25
  }
});

export default WritingView;
