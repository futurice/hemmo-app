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
            numberOfLines = {30}
            maxLength = {150}
            underlineColorAndroid = 'transparent'
            style={styles.textForm}/>
        </View>
        <Icon onPress={this.disableWriting} name='times-circle' size={40} style={styles.closeButton}/>

      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
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
  closeButton: {
    color: 'rgb(74, 79, 77)',
    position: 'absolute',
    top: 10,
    right: 15
  },
  textForm: {
    margin: 15,
    textAlignVertical: 'top'
  }
});

export default WritingView;
