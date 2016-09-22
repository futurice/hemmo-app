import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import SpeechBubble from '../components/SpeechBubble';
import Hemmo from '../components/Hemmo';
import {getSizeByHeight, getImage} from '../services/graphics';
import * as NavigationState from './navigation/NavigationState';

import {
  StyleSheet,
  View,
  Image
} from 'react-native';

const EndingView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      showBubble: true
    };
  },

  hideBubble() {
    this.props.dispatch(NavigationState.resetRoute());
  },

  restartAudioAndText() {
    this.setState({showBubble: true});
  },

  render() {

    if (this.state.showBubble === true) {
      var speechBubble = (
        <SpeechBubble
          text={'ending'}
          hideBubble={this.hideBubble}
          bubbleType={'puhekupla_oikea'}
          style={{top: 40, left: 40, margin: 45, fontSize: 14, size: 0.5}}/>
      );
    }
    return (
      <Image source={getImage('tausta_perus')} style={styles.container}>
        <View style={styles.hemmo}>
          <Hemmo image={'hemmo_keski'} size={0.8} restartAudioAndText={this.restartAudioAndText}/>
        </View>
        <Image
          source={getImage('lopetusteksti')}
          style={[styles.info, getSizeByHeight('lopetusteksti', 0.4)]}/>
        {speechBubble}
      </Image>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null
  },
  info: {
    position: 'absolute',
    left: 20,
    bottom: 20
  },
  hemmo: {
    position: 'absolute',
    bottom: 50,
    right: 20
  }
});

export default connect()(EndingView);
