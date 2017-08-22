import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { addMood, deleteMood } from '../state/UserState';
import { setText, setAudio } from '../state/HemmoState';
import { getSizeByWidth, getImage } from '../services/graphics';
import AppButton from '../components/AppButton';
import DoneButton from '../components/DoneButton';
import { showSaveModal } from '../state/SessionState';

const moods = require('../data/moods.js');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null,
  },
  scrollContainer: {
    paddingBottom: getSizeByWidth('done_button', 1).height,
  },
  font: {
    fontSize: 17,
    fontFamily: 'Gill Sans',
  },
  check: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  mood: {
    margin: 7,
    opacity: 0.8,
  },
  selectedMood: {
    opacity: 1,
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: 22,
  },
});

const mapStateToProps = state => ({
  selectedMoods: state.getIn(['user', 'currentUser', 'answers', 'moods']),
});

const mapDispatchToProps = dispatch => ({
  addMood: mood => dispatch(addMood(mood)),
  deleteMood: mood => dispatch(deleteMood(mood)),
  setText: text => dispatch(setText(text)),
  setAudio: audio => dispatch(setAudio(audio)),
  showSaveModal: () => dispatch(showSaveModal()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class MoodViewContainer extends Component {
  static navigationOptions = {
    title: 'Tunteet',
    headerRight: <View />, // Needed for a centered title,
    headerTitleStyle: styles.headerTitle,
  };

  static propTypes = {
    addMood: PropTypes.func.isRequired,
    deleteMood: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    setAudio: PropTypes.func.isRequired,
    selectedMoods: PropTypes.instanceOf(Set).isRequired,
    showSaveModal: PropTypes.func.isRequired,
  };

  addMood = async mood => {
    if (await this.props.selectedMoods.includes(mood.get('name'))) {
      this.props.setAudio('');
      this.props.deleteMood(mood.get('name'));
    } else {
      this.props.setAudio(mood.get('key'));
      this.props.addMood(mood.get('name'));
    }
  };

  isSelected = mood => this.props.selectedMoods.includes(mood.get('name'));

  renderMood = (mood, key) =>
    <View
      style={[styles.mood, this.isSelected(mood) ? styles.selectedMood : null]}
      key={key}
    >
      <AppButton
        background={mood.get('key')}
        onPress={() => this.addMood(mood)}
        width={getSizeByWidth(mood.get('key'), 0.36).width}
        shadow={this.isSelected(mood)}
      >
        <Image
          source={
            this.isSelected(mood)
              ? getImage('checkmark_small').shadow
              : getImage('checkmark_small_grey').shadow
          }
          style={[styles.check, getSizeByWidth('checkmark_small', 0.15)]}
        />
      </AppButton>
    </View>;

  renderMoods = () => moods.map((mood, key) => this.renderMood(mood, key));

  render() {
    return (
      <Image source={getImage('forest').normal} style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          overScrollMode={'always'}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.moodContainer}>
            {this.renderMoods()}
          </View>
        </ScrollView>
        <DoneButton
          onPress={this.props.showSaveModal}
          disabled={this.props.selectedMoods.size === 0}
        />
      </Image>
    );
  }
}
