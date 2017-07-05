/*
View that is shown at the end of application.
When speech ends or the speech bubble is closed, user is moved to home page
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SpeechBubble from '../components/SpeechBubble';
import Hemmo from '../components/Hemmo';
import { getSizeByHeight, getImage } from '../services/graphics';
import { resetCurrentUser } from './user/UserState';
import { NavigationActions } from 'react-navigation';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  info: {
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  hemmo: {
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
});

const mapDispatchToProps = dispatch => ({
  resetCurrentUser: () => dispatch(resetCurrentUser()),
  resetRoute: () => dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Home' }),
    ],
  })),
});

@connect(null, mapDispatchToProps)
export default class EndingViewContainer extends Component {

  static propTypes = {
    resetRoute: PropTypes.func.isRequired,
    resetCurrentUser: PropTypes.func.isRequired,
  };

  state = {
    showBubble: true,
  };

  restartAudioAndText = () => {
    this.setState({ showBubble: true });
  };

  end = () => {
    this.props.resetCurrentUser();
    this.props.resetRoute();
  };

  renderSpeechBubble = () => this.state.showBubble ? (
    <SpeechBubble
      text={'ending'}
      hideBubble={this.end}
      bubbleType={'puhekupla_oikea'}
      style={{ top: 40, left: 40, margin: 45, fontSize: 14, size: 0.5 }}
    />
    ) : null;

  render() {
    return (
      <Image source={getImage('tausta_perus')} style={styles.container}>
        <View style={styles.hemmo}>
          <Hemmo image={'hemmo_keski'} size={0.8} restartAudioAndText={this.restartAudioAndText} />
        </View>
        <Image
          source={getImage('lopetusteksti')}
          style={[styles.info, getSizeByHeight('lopetusteksti', 0.4)]}
        />
        {this.renderSpeechBubble()}
      </Image>
    );
  }
}
