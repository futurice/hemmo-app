import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as NavigationState from '../modules/navigation/NavigationState';
import * as UserState from '../modules/user/UserState';
import SpeechBubble from '../components/SpeechBubble';
import Hemmo from '../components/Hemmo';
import {getSize, getImage} from '../services/graphics';

import {
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

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

  restartAudioAndText() {
    this.setState({showBubble: true});
  },

  render() {
    if (this.state.showBubble === true) {
      var speechBubble = (
        <SpeechBubble
          text={'newRound'}
          hideBubble={this.hideBubble}
          bubbleType={'puhekupla_vasen'}
          style={{top: 70, left: 330, margin: 40, fontSize: 16, size: 0.4}}/>
      );
    }
    else {
      speechBubble = null;
    }

    return (
      <Image source={getImage('tausta_perus2')} style={styles.container}>
          <TouchableOpacity onPress={this.newRound}>
            <Image
              source={getImage('nappula_uudestaan')}
              style={getSize('nappula_uudestaan', 0.5)}/>
          </TouchableOpacity>

          <Hemmo image={'hemmo_keski'} size={0.7} restartAudioAndText={this.restartAudioAndText}/>

          <TouchableOpacity onPress={this.continue}>
            <Image
              source={getImage('nappula_seuraava2')}
              style={getSize('nappula_seuraava2', 0.5)}/>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: null,
    width: null
  }
});

export default connect()(NewRound);
