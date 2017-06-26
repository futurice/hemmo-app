import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { pushRoute } from '../navigation/NavigationState';
import { saveAnswer } from '../user/UserState';
import SpeechBubble from '../../components/SpeechBubble';
import Hemmo from '../../components/Hemmo';
import { getSizeByHeight, getSizeByWidth, getImage } from '../../services/graphics';
import {
  TouchableOpacity,
  Image,
  View,
} from 'react-native';

const moods = require('../../data/moods.js');
const styles = require('./styles.js');

const mapStateToProps = state => ({
  activityIndex: state.getIn(['user', 'currentUser', 'activityIndex']),
});

const mapDispatchToProps = dispatch => ({
  saveAnswer: (index, destination, answers) => dispatch(saveAnswer(index, destination, answers)),
  pushRoute: key => dispatch(pushRoute(key)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class MoodViewContainer extends Component {

  static propTypes = {
    activityIndex: PropTypes.number.isRequired,
    saveAnswer: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
  };

  state = {
    selectedMoods: List(),
    showBubble: true,
  };

  hideBubble = () => {
    this.setState({ showBubble: false });
  };

  restartAudioAndText = () => {
    this.setState({ showBubble: true });
  };

  renderBubble = text => (
    <SpeechBubble
      text={text}
      bubbleType={'puhekupla_oikea'}
      hideBubble={this.hideBubble}
      style={{ top: 110, left: 100, margin: 30, fontSize: 14, size: 0.5 }}
    />
    );

  save = () => {
    this.props.saveAnswer(null, 'moods', this.state.selectedMoods);
    this.props.pushRoute({ key: 'Record', allowReturn: true });
  };

  selectMood = (mood) => {
    const selectedMoods = this.state.selectedMoods;

    // If the mood is already selected, remove it from the list. Otherwise, add it
    this.setState({
      selectedMoods: selectedMoods.includes(mood) ? selectedMoods.filter(m => m !== mood) : selectedMoods.concat(mood),
    });
  };

  renderMood = (mood, key) => (
    <TouchableOpacity
      key={key}
      style={styles.mood}
      onPress={() => this.selectMood(mood)}
    >
      <Image
        source={getImage(mood)}
        style={[
          getSizeByWidth(mood, 0.17),
          key === moods.length - 1 ? { marginBottom: getSizeByWidth('ympyra_keski', 0.17).height + 5 } : null,
        ]}
      />
      {this.state.selectedMoods.includes(mood) ? this.renderCheckmark() : null}
    </TouchableOpacity>
    );

  renderCheckmark = () => (
    <Image
      source={getImage('valittu')}
      style={[styles.check, getSizeByHeight('valittu', 0.1)]}
    />
    );

  renderMoods = () => (
    <View style={styles.moodColumn}>
      {moods.map((mood, key) => this.renderMood(mood, key))}
    </View>
    );

  renderHemmo = () => (
    <View style={styles.hemmo}>
      <Hemmo
        key={'hemmo'}
        image={'hemmo_keski'}
        size={0.45}
        restartAudioAndText={this.restartAudioAndText}
      />
    </View>
    );

  renderNextButton = () => (
    <TouchableOpacity onPress={this.save} style={styles.saveButton}>
      <Image source={getImage('nappula_seuraava')} style={getSizeByHeight('nappula_seuraava', 0.1)} />
    </TouchableOpacity>
    );

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
}
