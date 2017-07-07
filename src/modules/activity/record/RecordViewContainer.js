import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import AudioRecorder from '../../../components/AudioRecorder';
import Hemmo from '../../../components/Hemmo';
import LoadingSpinner from '../../../components/LoadingSpinner';
import SpeechBubble from '../../../components/SpeechBubble';
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

const mapStateToProps = (state, ownProps) => ({
  activityIndex: state.getIn(['user', 'currentUser', 'activityIndex']),
  answers: state.getIn(['user', 'currentUser', 'answers']),
  phase: ownProps.navigation.state.params.phase,
});

const mapDispatchToProps = dispatch => ({
  pushRoute: (key, phase) => dispatch(NavigationActions.navigate({ routeName: key, params: { phase } })),
  popRoute: () => dispatch(NavigationActions.back()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class RecordViewContainer extends Component {

  static propTypes = {
    popRoute: PropTypes.func.isRequired,
    phase: PropTypes.string.isRequired,
    pushRoute: PropTypes.func.isRequired,
    activityIndex: PropTypes.number.isRequired,
    answers: PropTypes.instanceOf(Map).isRequired,
  };

  state = {
    text: '',
    showTextForm: false,
    showBubble: true,
    progress: 0,
    showMessage: false,
    disableWriting: false,
    showSpinner: false,
  };

  setText = (text) => {
    this.setState({ text });
  };

  getBubbleText = (phase) => {
    if (phase === 'moods') {
      return 'moodFeedback';
    } else if (phase === 'general') {
      return 'generalFeedback';
    }

    return 'record';
  };

  continue = (phase) => {
    if (phase === 'activities') {
      this.props.pushRoute('NewRound');
    } else if (phase === 'moods') {
      this.setState({
        showTextForm: false,
        showSpinner: false,
        showBubble: true,
        progress: 0,
      });

      this.props.pushRoute('Record', 'general');
    } else if (phase === 'general') {
      this.props.pushRoute('Ending');
    }
  };

  closeConfirmationMessage = (phase) => {
    this.setState({ showMessage: false });
    this.continue(phase);
  };

  showConfirmationMessage = () => {
    this.setState({ showMessage: true });
  };

  error = () => {
    this.setState({ showSpinner: false });
    Alert.alert('Ohops!', 'Jokin meni pieleen! Tarkista nettiyhteys tai yritä myöhemmin uudelleen!',
      [{ text: 'Ok' }]);
  };

  save = async (phase, attachmentType, attachmentPath) => {
    this.setState({ showSpinner: true });

    if (attachmentType === 'text') {
      this.toggleWriting();
    }

    try {
      const body = await formRequestBody(
        phase,
        attachmentType,
        this.state.text,
        this.props.activityIndex,
        this.props.answers,
      );

      try {
        const wasSuccessful = await save(attachmentPath, attachmentType, body);

        if (wasSuccessful.success) {
          if (attachmentType === 'skipped') {
            this.continue(phase);
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
  }

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

  renderBubble = phase => this.state.showBubble ? (
    <SpeechBubble
      text={this.getBubbleText(phase)}
      bubbleType={'puhekupla_oikea'}
      hideBubble={this.hideBubble}
      style={phase === 'moods' || phase === 'general'
        ? { top: 85, left: 180, margin: 30, fontSize: 18, size: 0.4 }
        : { top: 45, left: 40, margin: 50, fontSize: 17, size: 0.6 }}
    />
    ) : null;

  renderTextForm = phase => this.state.showTextForm ? (
    <TextForm
      toggleWriting={this.toggleWriting}
      phase={phase}
      save={this.save}
      setText={this.setText}
    />
    ) : null;

  renderSaveConfirmationWindow = phase => this.state.showMessage ? (
    <SaveConfirmationWindow
      phase={phase}
      closeWindow={this.closeConfirmationMessage}
    />
    ) : null;

  renderSkipButton = phase => (
    <TouchableOpacity
      onPress={() => this.save(phase, 'skipped')}
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

  renderAudioRecorder = phase => (
    <AudioRecorder
      save={this.save.bind(this)}
      toggleWritingButton={this.toggleWritingButton}
      phase={phase}
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

  renderHemmo = () => (
    <Hemmo
      image={'hemmo'}
      size={0.7}
      restartAudioAndText={this.restartAudioAndText}
    />
    );

  renderLeftColumn = phase => (
    <Image
      source={getImage('tausta_kapea')}
      style={[styles.leftColumn, getSizeByWidth('tausta_kapea', 0.6)]}
    >
      {this.renderBackButton()}
      {this.renderAudioRecorder(phase)}
      {this.renderWriteButton()}
    </Image>
    );

  renderRightColumn = phase => (
    <View style={styles.rightColumn}>
      {this.renderHemmo()}
      {this.renderSkipButton(phase)}
    </View>
    );

  render() {
    if (this.state.showSpinner) {
      return (
        <LoadingSpinner />
      );
    }

    const phase = this.props.phase;

    return (
      <Image source={getImage('tausta_perus')} style={styles.container}>
        {this.renderLeftColumn(phase)}
        {this.renderRightColumn(phase)}
        {this.renderTextForm(phase)}
        {this.renderBubble(phase)}
        {this.renderSaveConfirmationWindow(phase)}
      </Image>
    );
  }
}
