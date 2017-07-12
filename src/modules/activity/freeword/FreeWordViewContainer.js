import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import AudioRecorder from '../../../components/AudioRecorder';
import LoadingSpinner from '../../../components/LoadingSpinner';
import SaveConfirmationWindow from '../../../components/SaveConfirmationWindow';
import TextForm from '../../../components/TextForm';
import { NavigationActions } from 'react-navigation';
import { getSizeByHeight, getSizeByWidth, getImage } from '../../../services/graphics';
import { save, formRequestBody } from '../../../services/save';
import {
  TouchableOpacity,
  Image,
  Alert,
  View,
} from 'react-native';

const styles = require('./styles.js');

const mapStateToProps = state => ({
  activityIndex: state.getIn(['user', 'currentUser', 'activityIndex']),
  answers: state.getIn(['user', 'currentUser', 'answers']),
});

const mapDispatchToProps = dispatch => ({
  pushRoute: key => dispatch(NavigationActions.navigate({ routeName: key })),
  popRoute: () => dispatch(NavigationActions.back()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class RecordViewContainer extends Component {

  static propTypes = {
    popRoute: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    activityIndex: PropTypes.number.isRequired,
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

  continue = () => {
    this.props.pushRoute('Ending');
  };

  closeConfirmationMessage = () => {
    this.setState({ showMessage: false });
    this.continue();
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

  restartAudioAndText = () => {
    this.setState({ showBubble: true });
  };

  hideBubble = () => {
    this.setState({ showBubble: false });
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

  renderSkipButton = () => (
    <TouchableOpacity
      onPress={() => this.save('skipped')}
      style={styles.skipButtonHighlight}
    >
      <Image
        source={getImage('nappula_ohita')}
        style={[styles.skipButton, getSizeByHeight('nappula_ohita', 0.1)]}
      />
    </TouchableOpacity>
    );

  renderBackButton = () => (
    <TouchableOpacity onPress={this.props.popRoute}>
      <Image
        source={getImage('nappula_takaisin')}
        style={[styles.returnButton, getSizeByHeight('nappula_takaisin', 0.15)]}
      />
    </TouchableOpacity>
    );

  renderAudioRecorder = () => (
    <AudioRecorder
      save={this.save}
      toggleWritingButton={this.toggleWritingButton}
    />
    );

  renderWriteButton = () => (
    <View style={styles.buttonRow}>
      <TouchableOpacity
        disabled={this.state.disableWriting}
        onPress={this.toggleWriting}
      >
        <Image
          source={getImage('nappula_kirjoita')}
          style={[
            getSizeByHeight('nappula_kirjoita', 0.1),
            { opacity: this.state.disableWriting ? 0.4 : 1,
              backgroundColor: this.state.disableWriting ? 'gray' : 'white' }]}
        />
      </TouchableOpacity>
    </View>
    );

  renderLeftColumn = () => (
    <Image
      source={getImage('tausta_kapea')}
      style={[styles.leftColumn, getSizeByWidth('tausta_kapea', 0.6)]}
    >
      {this.renderBackButton()}
      {this.renderAudioRecorder()}
      {this.renderWriteButton()}
    </Image>
    );

  renderRightColumn = () => (
    <View style={styles.rightColumn}>
      {this.renderSkipButton()}
    </View>
    );

  render() {
    if (this.state.showSpinner) {
      return (
        <LoadingSpinner />
      );
    }

    return (
      <Image source={getImage('tausta_perus')} style={styles.container}>
        {this.renderLeftColumn()}
        {this.renderRightColumn()}
        {this.renderTextForm()}
        {/*{this.renderSaveConfirmationWindow()}*/}
      </Image>
    );
  }
}
