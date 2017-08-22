import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, ScrollView, Image, StyleSheet, View } from 'react-native';
import AudioRecorder from '../components/AudioRecorder';
import { getImage } from '../services/graphics';
import { showSaveModal } from '../state/SessionState';
import DoneButton from '../components/DoneButton';
import { addFreeWord } from '../state/UserState';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  scrollContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: 22,
  },
});

const mapDispatchToProps = dispatch => ({
  saveFreeWord: freeWord => dispatch(addFreeWord(freeWord)),
  showSaveModal: () => dispatch(showSaveModal()),
});

@connect(null, mapDispatchToProps)
export default class RecordViewContainer extends Component {
  static navigationOptions = {
    title: 'Nauhoita',
    headerRight: <View />, // Needed for a centered title,
    headerTitleStyle: styles.headerTitle,
  };

  static propTypes = {
    saveFreeWord: PropTypes.func.isRequired,
    showSaveModal: PropTypes.func.isRequired,
  };

  state = {
    shouldToggleRecord: false,
    isRecording: false,
  };

  error = () => {
    Alert.alert(
      'Ohops!',
      'Nauhoittamisessa tapahtui virhe! Voisitko yrittää myöhemmin uudelleen?',
    );
  };

  storeRecording = content => {
    this.props.saveFreeWord({ type: 'audio', content });
    this.props.showSaveModal();
  };

  renderDoneButton = () =>
    <DoneButton
      onPress={() => this.setState({ shouldToggleRecord: true })}
      disabled={!this.state.isRecording}
    />;

  render() {
    return (
      <Image source={getImage('forest').normal} style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          overScrollMode={'always'}
          contentContainerStyle={styles.scrollContainer}
        >
          <AudioRecorder
            save={this.storeRecording}
            shouldToggleRecord={this.state.shouldToggleRecord}
            isRecording={() => this.setState({ isRecording: true })}
          />
        </ScrollView>
        {this.renderDoneButton()}
      </Image>
    );
  }
}
