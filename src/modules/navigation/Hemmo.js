import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  AppState,
  Text,
} from 'react-native';
import { getImage, getSizeByHeight } from '../../services/graphics';
import AudioPlayerViewContainer from '../AudioPlayerViewContainer';
import { muteAudio } from '../user/UserState';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    height: 40,
    width: 40,
  },
  bubbleImage: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Gill Sans',
    fontSize: 12,
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10,
  },
});

const phrases = require('../../data/phrases.json');
const reactMixin = require('react-mixin');

let audiotrack;

const mapStateToProps = state => ({
  maIndex: state.getIn(['user', 'currentUser', 'answers', 'activities',
    state.getIn(['user', 'currentUser', 'activityIndex']), 'main']),
  saIndex: state.getIn(['user', 'currentUser', 'answers', 'activities',
    state.getIn(['user', 'currentUser', 'activityIndex']), 'sub']),
  audioMuted: state.getIn(['user', 'currentUser', 'audioMuted']),
});

const mapDispatchToProps = dispatch => ({
  muteAudio: () => dispatch(muteAudio()),
});

@connect(mapStateToProps, mapDispatchToProps)
@reactMixin.decorate(TimerMixin)
export default class Hemmo extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    maIndex: PropTypes.number,
    saIndex: PropTypes.number,
    muteAudio: PropTypes.func,
    audioMuted: PropTypes.bool,
  };

  state = {
    showBubble: true,
    currentAppState: AppState.currentState,
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  onEnd = () => {
    this.setTimeout(this.toggleBubble, 2000);
  };

  getBubbleText = () => {
    const text = this.props.navigation.state.routes[this.props.navigation.state.index].key;

    // Text of the speech bubble is related to selected main activity.
    // maIndex is the index of the selected main activity.
    if (this.props.maIndex || this.props.maIndex === 0) {
      // Text of the speech bubble is related to selected sub activity.
      // saIndex is the index of the selected sub activity.
      if (this.props.saIndex || this.props.saIndex === 0) {
        audiotrack = phrases[text][this.props.maIndex].subTexts[this.props.saIndex].audio;
        return phrases[text][this.props.maIndex].subTexts[this.props.saIndex].subText;
      }

      audiotrack = phrases[text][this.props.maIndex].audio;
      return phrases[text][this.props.maIndex].text;
    }

    audiotrack = phrases[text].audio;
    return phrases[text].text;
  };

  toggleBubble = () => {
    this.setState({ showBubble: !this.state.showBubble });
  };

  handleAppStateChange = (currentAppState) => {
    this.setState({ currentAppState });
  };

  renderMuteButton = () => (
    <TouchableOpacity onPress={this.props.muteAudio}>
      <Text>Hiljennä</Text>
    </TouchableOpacity>
    );

  renderBubble = () => this.state.currentAppState === 'active' && this.state.showBubble ? (
    <Modal
      animationType={'fade'}
      transparent
      visible={this.state.showBubble && this.state.currentAppState === 'active'}
      onRequestClose={() => console.log(' ')}
      supportedOrientations={['portrait', 'landscape']}
    >
      <TouchableOpacity onPress={this.toggleBubble}>
        <Image
          source={getImage('puhekupla_oikea')}
          style={[styles.bubbleImage, getSizeByHeight('puhekupla_oikea', 0.5)]}
        >
          <Text style={styles.text}>
            {this.getBubbleText()}
          </Text>
          {this.renderMuteButton()}
        </Image>
        {this.props.audioMuted ? null : <AudioPlayerViewContainer onEnd={this.onEnd} audioTrack={audiotrack} />}
      </TouchableOpacity>
    </Modal>
    ) : null;

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        {this.renderBubble()}
        <TouchableOpacity onPress={this.toggleBubble}>
          <Image
            source={getImage('hemmo_pieni')}
            style={styles.image}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}
