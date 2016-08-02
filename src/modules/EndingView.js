import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Hemmo from '../components/Hemmo';
import * as NavigationState from '../modules/navigation/NavigationState';
import SpeechBubble from '../components/SpeechBubble';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

var phrases = require('../../phrases.json');

const EndingView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired
  },

  startOver() {
    this.props.dispatch(NavigationState.resetRoute());
  },

  render() {

    var speechBubble = (
      <SpeechBubble
        text={"ending"}
        bubbleType={require('../../assets/graphics/puhekupla_norm.png')}
        style={{x: 10, y: 200}}/>
    );

    return (
      <View style={styles.container}>
        <Hemmo x={230} y={120}/>
        <View style={styles.info}>
          <TouchableOpacity onPress={this.startOver}>
            <Text style={styles.font}>
              {phrases['deliveredBy']}
            </Text>
          </TouchableOpacity>
        </View>
        {speechBubble}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  info: {
    position: 'absolute',
    left: 30,
    bottom: 30,
    height: 140,
    width: 140,
    borderRadius: 60,
    borderWidth: 1,
    padding: 5,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  font: {
    fontSize: 13,
    textAlign: 'center'
  }
});

export default connect()(EndingView);
