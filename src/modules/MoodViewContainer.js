import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { addMood, deleteMood } from '../state/UserState';
import { setText, setAudio } from '../state/HemmoState';
import {
  getSizeByHeight,
  getSizeByWidth,
  getImage,
} from '../services/graphics';

const moods = require('../data/moods.js');
const phrases = require('../data/phrases.json');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: {
    fontSize: 20,
    fontFamily: 'Gill Sans',
  },
  check: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  mood: {
    margin: 5,
  },
});

const mapStateToProps = state => ({
  selectedMoods: state.getIn(['user', 'currentUser', 'answers', 'moods']),
});

const mapDispatchToProps = dispatch => ({
  back: () => dispatch(NavigationActions.back()),
  addMood: mood => dispatch(addMood(mood)),
  deleteMood: mood => dispatch(deleteMood(mood)),
  setText: text => dispatch(setText(text)),
  setAudio: audio => dispatch(setAudio(audio)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class MoodViewContainer extends Component {
  static navigationOptions = {
    title: 'Tunteet',
    tabBarIcon: (
      <Image
        source={require('./icon_moods.png')}
        style={{ width: 64, height: 64 }}
      />
    ),
  };

  static propTypes = {
    addMood: PropTypes.func.isRequired,
    deleteMood: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    setAudio: PropTypes.func.isRequired,
    selectedMoods: PropTypes.instanceOf(Set).isRequired,
  };

  componentWillMount() {
    this.props.setText(phrases.Mood.text);
    this.props.setAudio(phrases.Mood.audio);
  }

  addMood = async mood => {
    (await this.props.selectedMoods.includes(mood))
      ? this.props.deleteMood(mood)
      : this.props.addMood(mood);
  };

  renderMood = (mood, key) =>
    <TouchableOpacity
      key={key}
      style={styles.mood}
      onPress={() => this.addMood(mood.get('name'))}
    >
      <Image
        source={mood.get('imageRoute')}
        style={getSizeByWidth(mood.get('key'), 0.2)}
      >
        {this.props.selectedMoods.includes(mood.get('name'))
          ? this.renderCheckmark()
          : null}
      </Image>
    </TouchableOpacity>;

  renderCheckmark = () =>
    <Image
      source={getImage('valittu')}
      style={[styles.check, getSizeByHeight('valittu', 0.1)]}
    />;

  renderMoods = () => moods.map((mood, key) => this.renderMood(mood, key));

  render() {
    return (
      <View style={styles.container}>
        {this.renderMoods()}
        <TouchableOpacity onPress={this.props.back}>
          <Image
            source={require('./done.png')}
            style={{ width: 120, height: 60 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
