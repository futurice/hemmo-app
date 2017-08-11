import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { addMood, deleteMood } from '../state/UserState';
import { setText, setAudio } from '../state/HemmoState';
import {
  getSizeByHeight,
  getSizeByWidth,
  getImage,
} from '../services/graphics';
import AppButton from '../components/AppButton';
import DoneButton from '../components/DoneButton';
import SaveConfirmationWindow from '../components/SaveConfirmationWindow';

const moods = require('../data/moods.js');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: null,
    width: null,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {},
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
    marginTop: 20,
  },
  mood: {
    margin: 7,
    opacity: 0.8,
  },
  selectedMood: {
    opacity: 1,
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
  };

  static propTypes = {
    back: PropTypes.func.isRequired,
    addMood: PropTypes.func.isRequired,
    deleteMood: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    setAudio: PropTypes.func.isRequired,
    selectedMoods: PropTypes.instanceOf(Set).isRequired,
  };

  state = {
    showSucceedingMessage: false,
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

  hideSucceedingMessage = () => {
    if (this.state.showSucceedingMessage) {
      this.setState({ showSucceedingMessage: false });
      this.props.back();
    }
  };

  renderSaveConfirmationWindow = () =>
    <SaveConfirmationWindow
      closeWindow={this.hideSucceedingMessage}
      visible={this.state.showSucceedingMessage}
    />;

  renderMood = (mood, key) =>
    <View
      style={[styles.mood, this.isSelected(mood) ? styles.selectedMood : null]}
      key={key}
    >
      <AppButton
        background={mood.get('key')}
        onPress={() => this.addMood(mood)}
        width={getSizeByWidth(mood.get('key'), 0.23).width}
        shadow={this.isSelected(mood)}
      >
        <Image
          source={
            this.isSelected(mood)
              ? getImage('valittu').shadow
              : getImage('valittu_harmaa').shadow
          }
          style={[styles.check, getSizeByHeight('valittu', 0.14)]}
        />
      </AppButton>
    </View>;

  renderMoods = () => moods.map((mood, key) => this.renderMood(mood, key));

  render() {
    return (
      <Image source={getImage('tausta_perus3').normal} style={styles.container}>
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
          onPress={() => this.setState({ showSucceedingMessage: true })}
          disabled={this.props.selectedMoods.size === 0}
        />
        {this.renderSaveConfirmationWindow()}
      </Image>
    );
  }
}
