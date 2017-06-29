/*
View that is shown when ever a round of feedback has been given.
 User can either move forward or give another round of feedback
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { addActivity, resetActivity } from '../modules/user/UserState';
import SpeechBubble from '../components/SpeechBubble';
import Hemmo from '../components/Hemmo';
import { getSizeByWidth, getImage } from '../services/graphics';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: null,
    width: null,
  },
});

const mapDispatchToProps = dispatch => ({
  addActivity: () => dispatch(addActivity()),
  resetActivity: () => dispatch(resetActivity()),
  pushRoute: key => dispatch(NavigationActions.navigate({ routeName: key })),
});

@connect(null, mapDispatchToProps)
export default class NewRoundContainer extends Component {

  static propTypes = {
    addActivity: PropTypes.func.isRequired,
    resetActivity: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
  };

  state = {
    showBubble: true,
  };

  newRound = () => {
    this.props.addActivity();
    this.props.pushRoute('Activity');
  };

  continue = () => {
    this.props.resetActivity();
    this.props.pushRoute('Mood');
  };

  hideBubble = () => {
    this.setState({ showBubble: false });
  };

  restartAudioAndText = () => {
    this.setState({ showBubble: true });
  };

  renderSpeechBubble = () => this.state.showBubble ? (
    <SpeechBubble
      text={'newRound'}
      hideBubble={this.hideBubble}
      bubbleType={'puhekupla_vasen'}
      style={{ top: 100, right: 0, margin: 40, fontSize: 16, size: 0.4 }}
    />
    ) : null;

  render() {
    return (
      <Image source={getImage('tausta_perus2')} style={styles.container}>
        <TouchableOpacity onPress={this.newRound}>
          <Image
            source={getImage('nappula_uudestaan')}
            style={getSizeByWidth('nappula_uudestaan', 0.30)}
          />
        </TouchableOpacity>

        <Hemmo image={'hemmo_keski'} size={0.6} restartAudioAndText={this.restartAudioAndText} />

        <TouchableOpacity onPress={this.continue}>
          <Image
            source={getImage('nappula_seuraava2')}
            style={getSizeByWidth('nappula_seuraava2', 0.30)}
          />
        </TouchableOpacity>

        {this.renderSpeechBubble()}
      </Image>
    );
  }
}
