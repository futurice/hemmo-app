import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { NavigationActions } from 'react-navigation';
import {
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Dimensions,
  Alert,
  View,
  StyleSheet,
} from 'react-native';
import AudioRecorder from '../components/AudioRecorder';
import LoadingSpinner from '../components/LoadingSpinner';
import SaveConfirmationWindow from '../components/SaveConfirmationWindow';
import { addFreeWord } from '../state/UserState';
import { setText, setAudio } from '../state/HemmoState';
import { getSessionId } from '../utils/session';
import { xhr } from '../utils/api';
import { getSizeByHeight, getImage } from '../services/graphics';

import AppButton from '../components/AppButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioRecorder: {
    marginBottom: 70,
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
  setText: text => dispatch(setText(text)),
  setAudio: audio => dispatch(setAudio(audio)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class FreeWordViewContainer extends Component {
  static navigationOptions = {
    title: 'Kirjoita',
  };

  static propTypes = {
    back: PropTypes.func.isRequired,
    popRoute: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    setAudio: PropTypes.func.isRequired,
    saveFreeWord: PropTypes.func.isRequired,
    answers: PropTypes.instanceOf(Map).isRequired,
  };

  state = {
    text: '',
    showSucceedingMessage: false,
    showSpinner: false,
  };

  componentWillMount() {
    this.props.setText(phrases.FreeWord.text);
    this.props.setAudio(phrases.FreeWord.audio);
  }

  error = () => {
    this.setState({ showSpinner: false });
    Alert.alert(
      'Ohops!',
      'Jokin meni pieleen! Tarkista nettiyhteys tai yritä myöhemmin uudelleen!',
      [{ text: 'Ok' }],
    );
  };

  sendText = async () => {
    this.setState({ showSpinner: true });

    this.props.saveFreeWord(Map({ text: this.state.text }));

    const attachmentBody = new FormData();
    attachmentBody.append('data', this.state.text);

    const feedbackId = await getSessionId();

    try {
      await xhr(
        'POST',
        `/app/feedback/${feedbackId}/attachments`,
        attachmentBody,
      );

      this.setState({ showSucceedingMessage: true });
    } catch (error) {
      console.log(error);
      Alert.alert('Oops! Jokin meni pieleen!', 'Yritä myöhemmin uudelleen!');
    }

    this.setState({ showSpinner: false });
  };

  renderTextForm = () =>
    <Image
      style={{
        height: null,
        width: Dimensions.get('window').width * 0.8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}
      resizeMode="stretch"
      source={getImage('textbox').normal}
    >
      <TextInput
        multiline
        autoFocus={!this.state.text}
        numberOfLines={30}
        maxLength={500}
        onChangeText={text => this.setState({ text })}
        underlineColorAndroid="transparent"
        style={{
          flex: 1,
          textAlignVertical: 'top',
          margin: 16,
        }}
      />
    </Image>;

  renderSaveConfirmationWindow = () =>
    this.state.showSucceedingMessage
      ? <SaveConfirmationWindow closeWindow={this.props.back} />
      : null;

  renderDoneButton = () =>
    <TouchableOpacity onPress={this.sendText}>
      <Image
        source={require('./done.png')}
        style={{ width: 120, height: 60 }}
      />
    </TouchableOpacity>;

  render() {
    if (this.state.showSpinner) {
      return <LoadingSpinner />;
    }

    return (
      <View style={styles.container}>
        <View style={{ paddingVertical: 32, flex: 1 }}>
          {this.renderTextForm()}
        </View>
        {this.renderDoneButton()}
        {this.renderSaveConfirmationWindow()}
      </View>
    );
  }
}
