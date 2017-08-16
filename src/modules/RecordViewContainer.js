import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { NavigationActions } from 'react-navigation';
import { Alert, ScrollView, Image, StyleSheet } from 'react-native';
import AudioRecorder from '../components/AudioRecorder';
import LoadingSpinner from '../components/LoadingSpinner';
import { getImage, getSizeByWidth } from '../services/graphics';
import DoneButton from '../components/DoneButton';
import { addFreeWord } from '../state/UserState';
import SaveConfirmationWindow from '../components/SaveConfirmationWindow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  scrollContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingBottom: getSizeByWidth('done_button', 1).height,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

const mapStateToProps = state => ({
  answers: state.getIn(['user', 'currentUser', 'answers']),
  freeWordKey: state.getIn(['navigatorState', 'routes', 2, 'key']),
});

const mapDispatchToProps = dispatch => ({
  back: key => dispatch(NavigationActions.back({ key })),
  saveFreeWord: freeWord => dispatch(addFreeWord(freeWord)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class RecordViewContainer extends Component {
  static navigationOptions = {
    title: 'Nauhoita',
  };

  static propTypes = {
    back: PropTypes.func.isRequired,
    freeWordKey: PropTypes.string,
    saveFreeWord: PropTypes.func.isRequired,
    answers: PropTypes.instanceOf(Map).isRequired,
  };

  state = {
    text: '',
    activeWidget: null,
    showTextForm: false,
    progress: 0,
    showSucceedingMessage: false,
    showSpinner: false,
    recordType: null,
    shouldToggleRecord: false,
    isRecording: false,
  };

  error = () => {
    this.setState({ showSpinner: false });
    Alert.alert(
      'Ohops!',
      'Nauhoittamisessa tapahtui virhe! Voisitko yrittää myöhemmin uudelleen?',
    );
  };

  storeRecording = async (type, content) => {
    await this.props.saveFreeWord({ type, content });
    this.setState({ recordType: type, showSucceedingMessage: true });
  };

  hideSucceedingMessage = () => {
    if (this.state.showSucceedingMessage) {
      this.setState({ showSucceedingMessage: false });
      this.props.back(this.props.freeWordKey);
    }
  };

  renderDoneButton = () =>
    <DoneButton
      onPress={() => this.setState({ shouldToggleRecord: true })}
      disabled={!this.state.isRecording}
    />;

  renderSaveConfirmationWindow = () =>
    <SaveConfirmationWindow
      closeWindow={this.hideSucceedingMessage}
      visible={this.state.showSucceedingMessage}
    />;

  render() {
    if (this.state.showSpinner) {
      return <LoadingSpinner />;
    }

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
        {this.renderSaveConfirmationWindow()}
      </Image>
    );
  }
}
