import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as NavigationState from '../modules/navigation/NavigationState';
import * as UserState from '../modules/user/UserState';
import SpeechBubble from '../components/SpeechBubble';

import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity
} from 'react-native';

var graphics = require('../components/graphics.js');

const NewRound = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired
  },

  newRound() {
    this.props.dispatch(NavigationState.resetRoute());
    this.props.dispatch(UserState.addActivity());
    this.props.dispatch(NavigationState.pushRoute({key: 'Activity', allowReturn: false}));
  },

  continue() {
    this.props.dispatch(UserState.resetActivity());
    this.props.dispatch(NavigationState.pushRoute({key: 'Emotions', allowReturn: false}));
  },

  render() {
    var speechBubble = (
      <SpeechBubble
      text={"newRound"}
      bubbleType={require('../../assets/graphics/bubbles/puhekupla_vasen.png')}
      style={{x: 10, y: 100}}/>
    );

    return (
      <Image source={graphics.get('tausta_perus2')} style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this.newRound}>
            <Image source={graphics.get('nappula_uudestaan')} style={styles.button}/>
          </TouchableOpacity>
        </View>
        <View style={styles.centercolumn}>
          <Image source={graphics.get('hemmo_keski')} style={{height: 180, width: 140}}/>
        </View>
        <View style={styles.column}>
          <TouchableOpacity onPress={this.continue}>
            <Image source={graphics.get('nappula_seuraava2')} style={styles.button}/>
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
    flexDirection: 'row',
    backgroundColor: 'white',
    height: null,
    width: null
  },
  column: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  centercolumn: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 150,
    width: 150,
    borderRadius: 60,
    borderWidth: 1
  },
  buttonHighlight: {
    height: 150,
    width: 150,
    borderRadius: 60,
    justifyContent: 'center'
  }
});

export default connect()(NewRound);
