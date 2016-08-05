import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as NavigationState from '../modules/navigation/NavigationState';
import SpeechBubble from '../components/SpeechBubble';

import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View
} from 'react-native';

var graphics = require('../components/graphics.js');

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
        bubbleType={graphics.get('puhekupla_oikea')}
        style={{top: 30, left: 130, height: 160, width: 260, margin: 55, fontSize: 12}}/>
    );

    return (
      <Image source={graphics.get('tausta_perus')} style={styles.container}>
        <Image source={graphics.get('hemmo_keski')} style={styles.hemmo}/>
        <View style={styles.info}>
          <TouchableOpacity onPress={this.startOver}>
            <Image source={graphics.get('lopetusteksti')} style={styles.endingText}/>
          </TouchableOpacity>
        </View>
        {speechBubble}
      </Image>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: null,
    height: null
  },
  endingText: {
    height: 140,
    width: 155
  },
  info: {
    position: 'absolute',
    left: 30,
    bottom: 30
  },
  font: {
    fontSize: 13,
    textAlign: 'center'
  },
  hemmo: {
    height: 250,
    width: 195,
    position: 'absolute',
    bottom: 50,
    right: 20
  }
});

export default connect()(EndingView);
