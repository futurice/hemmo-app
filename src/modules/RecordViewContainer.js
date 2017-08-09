import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { NavigationActions } from 'react-navigation';
import { Image, ScrollView, Alert, View, StyleSheet } from 'react-native';
import AudioRecorder from '../components/AudioRecorder';
import LoadingSpinner from '../components/LoadingSpinner';
import SaveConfirmationWindow from '../components/SaveConfirmationWindow';
import { addFreeWord } from '../state/UserState';
import { setAudio } from '../state/HemmoState';
import { getSessionId } from '../utils/session';
import { xhr } from '../utils/api';
import { getSizeByHeight, getImage } from '../services/graphics';

import AppButton from '../components/AppButton';
import DoneButton from '../components/DoneButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  audioRecorder: {
    paddingVertical: 16,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const phrases = require('../data/phrases.json');

const mapStateToProps = state => ({
  answers: state.getIn(['user', 'currentUser', 'answers']),
});

const mapDispatchToProps = dispatch => ({
  back: () => dispatch(NavigationActions.back()),
  pushRoute: key => dispatch(NavigationActions.navigate({ routeName: key })),
  popRoute: () => dispatch(NavigationActions.back()),
  saveFreeWord: freeWord => dispatch(addFreeWord(freeWord)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class FreeWordViewContainer extends Component {
  static navigationOptions = {
    title: 'Nauhoita',
  };

  static propTypes = {
    back: PropTypes.func.isRequired,
    popRoute: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
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
  };

  /*setText = text => {
    this.setState({ text });
  };*/

  error = () => {
    this.setState({ showSpinner: false });
    Alert.alert(
      'Ohops!',
      'Jokin meni pieleen! Tarkista nettiyhteys tai yritä myöhemmin uudelleen!',
      [{ text: 'Ok' }],
    );
  };

  /*getRequestBody = (type, content) => {
    const attachmentBody = new FormData();

    if (type === 'audio') {
      const file = {
        uri: `file://${content}`,
        type: 'audio/mp4',
        name: 'file',
      };

      attachmentBody.append('data', file);
    } else {
      attachmentBody.append('data', content);
    }

    return attachmentBody;
  };

  sendFreeWord = async (type, content) => {
    this.setState({ showSpinner: true });

    this.props.saveFreeWord({ type, content });

    if (type === 'text') {
      this.toggleWriting();
    }

    const feedbackId = await getSessionId();

    try {
      await xhr(
        'POST',
        `/app/feedback/${feedbackId}/attachments`,
        this.getRequestBody(type, content),
      );

      this.setState({ showSucceedingMessage: true });
    } catch (error) {
      console.log(error);
      Alert.alert('Oops! Jokin meni pieleen!', 'Yritä myöhemmin uudelleen!');
    }

    this.setState({ showSpinner: false });
  };

  hideSucceedingMessage = () => {
    if (this.state.showSucceedingMessage) {
      this.setState({ showSucceedingMessage: false });
      this.props.back();
    }
  };*/

  storeRecording = (type, content) => {
    this.props.saveFreeWord({ type, content });
    this.setState({ recordType: type });
  };

  /*renderSaveConfirmationWindow = () =>
    <SaveConfirmationWindow
      closeWindow={this.hideSucceedingMessage}
      visible={this.state.showSucceedingMessage}
    />;*/

  renderAudioRecorder = () =>
    <AudioRecorder save={this.storeRecording.bind(this)} />;

  render() {
    if (this.state.showSpinner) {
      return <LoadingSpinner />;
    }

    return (
      <Image source={getImage('tausta_perus3').normal} style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          overScrollMode={'always'}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.audioRecorder}>
            {this.renderAudioRecorder()}
          </View>
        </ScrollView>
        <View style={styles.doneButton}>
          <DoneButton
            onPress={this.props.back}
            disabled={this.state.recordType === null}
          />
        </View>
      </Image>
    );
  }
}
