import React from 'react';
import Hemmo from '../components/Hemmo';
import SpeechBubble from '../components/SpeechBubble';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

var phrases = require('../../phrases.json');

const EndingView = React.createClass({

  render() {

    var speechBubble = <SpeechBubble text={"ending"} position={{x: 10, y: 200, triangle: 70}}/>;

    return (
      <View style={styles.container}>
        <Hemmo x={230} y={120}/>
        <View style={styles.info}>
          <Text style={styles.font}>
            {phrases['deliveredBy']}
          </Text>
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

export default EndingView;
