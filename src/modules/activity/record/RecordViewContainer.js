import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {List, Map} from 'immutable';
import AudioRecorder from '../../../components/AudioRecorder';
import Hemmo from '../../../components/Hemmo';
import LoadingSpinner from '../../../components/LoadingSpinner';
import SpeechBubble from '../../../components/SpeechBubble';
import SaveConfirmationWindow from '../../../components/SaveConfirmationWindow';
import TextForm from '../../../components/TextForm';
import {pushRoute, resetRoute, popRoute} from '../../navigation/NavigationState';
import {getSizeByHeight, getSizeByWidth, getImage} from '../../../services/graphics';
import {save, formRequestBody} from '../../../services/save';
import {
  TouchableOpacity,
  Image,
  Alert,
  View
} from 'react-native';

let styles = require('./styles.js');

const mapStateToProps = state => ({
  savedActivities: state.getIn(['user', 'currentUser', 'answers', 'activities']),
  activityIndex: state.getIn(['user', 'currentUser', 'activityIndex']),
  answers: state.getIn(['user', 'currentUser', 'answers'])
});

const mapDispatchToProps = dispatch => ({
  resetRoute: () => dispatch(resetRoute()),
  popRoute: () => dispatch(popRoute()),
  pushRoute: (key) => dispatch(pushRoute(key))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class RecordViewContainer extends Component {

  static propTypes = {
    savedActivities: PropTypes.instanceOf(List),
    popRoute: PropTypes.func.isRequired,
    resetRoute: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    activityIndex: PropTypes.number.isRequired,
    answers: PropTypes.instanceOf(Map)
  };

  state = {
    text: '',
    showTextForm: false,
    showBubble: true,
    progress: 0,
    generalFeedbackView: false,
    showMessage: false,
    disableWriting: false,
    showSpinner: false
  };

  toggleWriting = () => {
    this.setState({text: '', showTextForm: !this.state.showTextForm});
  };

  toggleWritingButton = (value) => {
    this.setState({disableWriting: value});
  };

  hideBubble = () => {
    this.setState({showBubble: false});
  };

  restartAudioAndText = () => {
    this.setState({showBubble: true});
  };

  setText = (text) => {
    this.setState({text});
  };

  async save(phase, attachmentType, attachmentPath) {
    this.setState({showSpinner: true});

    if (attachmentType === 'text') {
      this.toggleWriting();
    }

    try {
      let body = await formRequestBody(
        phase,
        attachmentType,
        this.state.text,
        this.props.activityIndex,
        this.props.answers
      );

      try {
        let wasSuccessful = await save(attachmentPath, attachmentType, body);

        if (wasSuccessful.success) {
          if (attachmentType === 'audio') {
            this.setState({showSpinner: false});
            this.showConfirmationMessage();
          }
          else {
            this.continue(phase);
          }
        }
        else {
          this.error();
        }
      }
      catch (e) {
        this.error();
      }
    }
    catch (e) {
      this.error();
    }
  }

  error = () => {
    this.setState({showSpinner: false});
    Alert.alert('Ohops!', 'Jokin meni pieleen! Tarkista nettiyhteys tai yritä myöhemmin uudelleen!',
    [{text: 'Ok', onPress: this.props.resetRoute}]);
  };

  showConfirmationMessage = () => {
    this.setState({showMessage: true});
  };

  closeConfirmationMessage = (phase) => {
    this.setState({showMessage: false});
    this.continue(phase);
  };

  continue = (phase) => {
    if (phase === 'activities') {
      this.props.pushRoute({key: 'NewRound', allowReturn: false});
    }
    else if (phase === 'moods') {
      this.setState({
        showTextForm: false,
        showSpinner: false,
        showBubble: true,
        progress: 0,
        generalFeedbackView: true
      });

      this.props.pushRoute({key: 'Record', allowReturn: false});
    }
    else if (phase === 'general') {
      this.props.pushRoute({key: 'End', allowReturn: false});
    }
  };

  getBubbleText = (phase) => {
    if (phase === 'moods') {
      return 'moodFeedback';
    }
    else if (phase === 'general') {
      return 'generalFeedback';
    }
    else {
      return 'record';
    }
  };

  renderBubble = (phase) => {
    return this.state.showBubble ? (
      <SpeechBubble
        text={this.getBubbleText(phase)}
        bubbleType={'puhekupla_oikea'}
        hideBubble={this.hideBubble}
        style={phase === 'moods' || phase === 'general'
        ? {top: 85, left: 180, margin: 30, fontSize: 18, size: 0.4}
        : {top: 45, left: 40, margin: 50, fontSize: 17, size: 0.6}}
      />
    ) : null;
  };

  renderTextForm = (phase) => {
    return this.state.showTextForm ? (
      <TextForm
        toggleWriting={this.toggleWriting}
        phase={phase}
        save={this.save.bind(this)}
        setText={this.setText}
      />
    ) : null;
  };

  renderSaveConfirmationWindow = (phase) => {
    return this.state.showMessage ? (
      <SaveConfirmationWindow
        phase={phase}
        closeWindow={this.closeConfirmationMessage}
      />
    ) : null;
  };

  renderSkipButton = (phase) => {
    return (
      <TouchableOpacity
        onPress={() => this.save(phase, 'skipped')}
        style={styles.skipButtonHighlight}>
        <Image
          source={getImage('nappula_ohita')}
          style={[styles.skipButton, getSizeByHeight('nappula_ohita', 0.1)]}/>
      </TouchableOpacity>
    );
  };

  renderBackButton = () => {
    return (
      <TouchableOpacity onPress={this.props.popRoute}>
        <Image
          source={getImage('nappula_takaisin')}
          style={[styles.returnButton, getSizeByHeight('nappula_takaisin', 0.15)]}/>
      </TouchableOpacity>
    );
  };

  renderAudioRecorder = (phase) => {
    return (
      <AudioRecorder
        save={this.save.bind(this)}
        toggleWritingButton={this.toggleWritingButton}
        phase={phase}
      />
    );
  };

  renderWriteButton = () => {
    return (
      <View style={styles.buttonRow}>
        <TouchableOpacity
          disabled={this.state.disableWriting}
          onPress={this.toggleWriting}>
          <Image
            source={getImage('nappula_kirjoita')}
            style={[
              getSizeByHeight('nappula_kirjoita', 0.1),
              {opacity: this.state.disableWriting ? 0.4 : 1,
                backgroundColor: this.state.disableWriting ? 'gray' : 'white'}]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderHemmo = () => {
    return (
      <Hemmo
        image={'hemmo'}
        size={0.7}
        restartAudioAndText={this.restartAudioAndText}
      />
    );
  };

  renderLeftColumn = (phase) => {
    return (
      <Image
        source={getImage('tausta_kapea')}
        style={[styles.leftColumn, getSizeByWidth('tausta_kapea', 0.6)]}>
        {this.renderBackButton()}
        {this.renderAudioRecorder(phase)}
        {this.renderWriteButton()}
      </Image>
    );
  };

  renderRightColumn = (phase) => {
    return (
      <View style={styles.rightColumn}>
        {this.renderHemmo()}
        {this.renderSkipButton(phase)}
      </View>
    );
  };

  getCurrentPhase = () => {
    if (this.props.activityIndex === -1) {
      if (!this.state.generalFeedbackView) {
        return 'moods';
      }
      else {
        return 'general';
      }
    }
    else {
      return 'activities';
    }
  };

  render() {
    if (this.state.showSpinner) {
      return (
        <LoadingSpinner/>
      );
    }

    let phase = this.getCurrentPhase();

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
