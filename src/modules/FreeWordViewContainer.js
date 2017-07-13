import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { NavigationActions } from 'react-navigation';
import {
  TouchableOpacity,
  Image,
  Alert,
  View,
  StyleSheet,
} from 'react-native';
import AudioRecorder from '../components/AudioRecorder';
import LoadingSpinner from '../components/LoadingSpinner';
import SaveConfirmationWindow from '../components/SaveConfirmationWindow';
import TextForm from '../components/TextForm';
import { getSizeByHeight, getImage } from '../services/graphics';
import { save, formRequestBody } from '../services/save';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  writeButton: {
    margin: 50,
  },
  audioRecorder: {
    margin: 50,
  },
});

const mapStateToProps = state => ({
  answers: state.getIn(['user', 'currentUser', 'answers']),
});

const mapDispatchToProps = dispatch => ({
  pushRoute: key => dispatch(NavigationActions.navigate({ routeName: key })),
  popRoute: () => dispatch(NavigationActions.back()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class FreeWordViewContainer extends Component {

  static navigationOptions = {
    title: 'Kerro vapaasti',
  };

  static propTypes = {
    popRoute: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    answers: PropTypes.instanceOf(Map).isRequired,
  };

  state = {
    text: '',
    showTextForm: false,
    progress: 0,
    showMessage: false,
    disableWriting: false,
    showSpinner: false,
  };

  setText = (text) => {
    this.setState({ text });
  };

  closeConfirmationMessage = () => {
    this.setState({ showMessage: false });
  };

  showConfirmationMessage = () => {
    this.setState({ showMessage: true });
  };

  error = () => {
    this.setState({ showSpinner: false });
    Alert.alert('Ohops!', 'Jokin meni pieleen! Tarkista nettiyhteys tai yritä myöhemmin uudelleen!',
      [{ text: 'Ok' }]);
  };

  save = async (attachmentType, attachmentPath) => {
    this.setState({ showSpinner: true });

    if (attachmentType === 'text') {
      this.toggleWriting();
    }

    try {
      const body = await formRequestBody(
        attachmentType,
        this.state.text,
        this.props.activityIndex,
        this.props.answers,
      );

      try {
        const wasSuccessful = await save(attachmentPath, attachmentType, body);

        if (wasSuccessful.success) {
          if (attachmentType === 'skipped') {
            this.continue();
          } else {
            this.setState({ showSpinner: false });
            this.showConfirmationMessage();
          }
        } else {
          this.error();
        }
      } catch (e) {
        this.error();
      }
    } catch (e) {
      this.error();
    }
  };

  toggleWritingButton = (value) => {
    this.setState({ disableWriting: value });
  };

  toggleWriting = () => {
    this.setState({ text: '', showTextForm: !this.state.showTextForm });
  };

  renderTextForm = () => this.state.showTextForm ? (
    <TextForm
      toggleWriting={this.toggleWriting}
      save={this.save}
      setText={this.setText}
    />
    ) : null;

  renderSaveConfirmationWindow = () => this.state.showMessage ? (
    <SaveConfirmationWindow
      closeWindow={this.closeConfirmationMessage}
    />
    ) : null;

  renderAudioRecorder = () => (
    <View style={styles.audioRecorder}>
      <AudioRecorder
        save={this.save}
        toggleWritingButton={this.toggleWritingButton}
      />
    </View>
  );

  renderWriteButton = () => (
    <TouchableOpacity
      disabled={this.state.disableWriting}
      onPress={this.toggleWriting}
      style={styles.writeButton}
    >
      <Image
        source={getImage('nappula_kirjoita')}
        style={[
          getSizeByHeight('nappula_kirjoita', 0.15),
          { opacity: this.state.disableWriting ? 0.4 : 1,
            backgroundColor: this.state.disableWriting ? 'gray' : 'white' }]}
      />
    </TouchableOpacity>
    );

  render() {
    if (this.state.showSpinner) {
      return (
        <LoadingSpinner />
      );
    }

    return (
      <View style={styles.container}>
        {this.renderAudioRecorder()}
        {this.renderWriteButton()}
        {this.renderTextForm()}
        {/*{this.renderSaveConfirmationWindow()}*/}
      </View>
    );
  }
}
