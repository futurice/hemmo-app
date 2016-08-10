import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as NavigationState from '../modules/navigation/NavigationState';
import SpeechBubble from '../components/SpeechBubble';
import {getSize, getImage} from '../services/graphics';

import {
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

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
        text={'ending'}
        bubbleType={'puhekupla_oikea'}
        style={{top: 40, left: 100, margin: 45, fontSize: 14, size: 0.5}}/>
    );

    return (
      <Image source={getImage('tausta_perus')} style={styles.container}>
        <Image source={getImage('hemmo_keski')} style={[styles.hemmo, getSize('hemmo_keski', 0.8)]}/>
          <TouchableOpacity onPress={this.startOver} style={styles.info}>
            <Image source={getImage('lopetusteksti')} style={getSize('lopetusteksti', 0.4)}/>
          </TouchableOpacity>
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
