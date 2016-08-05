import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as NavigationState from '../modules/navigation/NavigationState';
import * as UserState from '../modules/user/UserState';
import SpeechBubbleView from '../components/SpeechBubbleView';

import {
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

var graphics = require('../components/graphics.js');

const NewRound = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      showBubble: true
    };
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

  hideBubble() {
    this.setState({showBubble: false});
  },

  render() {
    if (this.state.showBubble === true) {
      var speechBubble = (
        <SpeechBubbleView
          text={'newRound'}
          hideBubble={this.hideBubble}
          bubbleType={graphics.get('puhekupla_vasen')}
          style={{top: 70, left: 330, height: 160, width: 265, margin: 40, fontSize: 16}}/>
      );
    }
    else {
      speechBubble = null;
    }

    return (
      <Image source={graphics.get('tausta_perus2')} style={styles.container}>
          <TouchableOpacity onPress={this.newRound}>
            <Image source={graphics.get('nappula_uudestaan')} style={styles.button}/>
          </TouchableOpacity>

          <Image source={graphics.get('hemmo_keski')} style={{flex: 1, height: 220}}/>

          <TouchableOpacity onPress={this.continue}>
            <Image source={graphics.get('nappula_seuraava2')} style={styles.button}/>
          </TouchableOpacity>
        {speechBubble}
      </Image>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: null,
    width: null
  },
  button: {
    height: 180,
    width: 180
  }
});

export default connect()(NewRound);
