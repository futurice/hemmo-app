import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';
import * as UserState from '../../modules/user/UserState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import SpeechBubble from '../../components/SpeechBubble';
import Hemmo from '../../components/Hemmo';
import {getSizeByHeight, getSizeByWidth, getImage} from '../../services/graphics';

import {
  TouchableOpacity,
  Image,
  View
} from 'react-native';

let moods = require('../../data/moods.js');
let styles = require('./styles.js');

const MoodViewContainer = React.createClass({

  propTypes: {
    activityIndex: PropTypes.number.isRequired,
    dispatch: PropTypes.func
  },

  getInitialState() {
    return {
      selectedMoods: List(),
      showBubble: true
    };
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  restartAudioAndText() {
    this.setState({showBubble: true});
  },

  renderBubble(text) {
    return (
      <SpeechBubble
        text={text}
        bubbleType={'puhekupla_oikea'}
        hideBubble={this.hideBubble}
        style={{top: 110, left: 100, margin: 30, fontSize: 14, size: 0.5}}
      />
    );
  },

  save() {
    this.props.dispatch(UserState.saveAnswer(null, 'moods', this.state.selectedMoods));
    this.props.dispatch(NavigationState.pushRoute({key: 'Record', allowReturn: true}));
  },

  selectMood(mood) {
    let selectedMoods = this.state.selectedMoods;

    // If the mood is already selected, remove it from the list. Otherwise, add it
    this.setState({
      selectedMoods: selectedMoods.includes(mood) ? selectedMoods.filter(m => m !== mood) : selectedMoods.concat(mood)
    });
  },

  renderMood(mood, key) {
    return (
      <TouchableOpacity
        key={key}
        style={styles.mood}
        onPress={this.selectMood.bind(this, mood)}>
        <Image
          source={getImage(mood)}
          style={[
            getSizeByWidth(mood, 0.17),
            key === moods.length - 1 ? {marginBottom: getSizeByWidth('ympyra_keski', 0.17).height + 5} : null
          ]}
        />
        {this.state.selectedMoods.includes(mood) ? this.renderCheckmark() : null}
      </TouchableOpacity>
    );
  },

  renderCheckmark() {
    return (
      <Image
        source={getImage('valittu')}
        style={[styles.check, getSizeByHeight('valittu', 0.1)]}
      />
    );
  },

  renderMoods() {
    return (
      <View style={styles.moodColumn}>
        {moods.map((mood, key) => this.renderMood(mood, key))}
      </View>
    );
  },

  renderHemmo() {
    return (
      <View style={styles.hemmo}>
        <Hemmo
          key={'hemmo'}
          image={'hemmo_keski'}
          size={0.45} restartAudioAndText={this.restartAudioAndText}
        />
      </View>
    );
  },

  renderNextButton() {
    return (
      <TouchableOpacity onPress={this.save} style={styles.saveButton}>
        <Image source={getImage('nappula_seuraava')} style={getSizeByHeight('nappula_seuraava', 0.1)}/>
      </TouchableOpacity>
    );
  },

  render() {
    return (
      <Image source={getImage('tausta_perus2')} style={styles.container}>
        <Image source={getImage('tausta_levea')} style={styles.moodContainer}>
          {this.renderMoods()}
          {this.renderHemmo()}
          {this.renderNextButton()}
          {this.state.showBubble ? this.renderBubble('moods') : null}
        </Image>
      </Image>
    );
  }
});

export default connect(
  state => ({
    activityIndex: state.getIn(['user', 'currentUser', 'activityIndex'])
  })
)(MoodViewContainer);
