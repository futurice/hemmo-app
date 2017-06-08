import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {List, Map} from 'immutable';
import AudioRecorder from '../../../components/AudioRecorder';
import TitlePanel from '../../../components/TitlePanel';
import Hemmo from '../../../components/Hemmo';
import LoadingSpinner from '../../../components/LoadingSpinner';
import SpeechBubble from '../../../components/SpeechBubble';
import SaveConfirmationWindow from '../../../components/SaveConfirmationWindow';
import TextForm from '../../../components/TextForm';
import * as NavigationState from '../../../modules/navigation/NavigationState';
import {getSizeByHeight, getSizeByWidth, getImage} from '../../../services/graphics';
import {save, formRequestBody} from '../../../services/save';

import {
  TouchableOpacity,
  Image,
  Alert,
  View
} from 'react-native';

var styles = require('./styles.js');

const RecordViewContainer = React.createClass({

  propTypes: {
    savedActivities: PropTypes.instanceOf(List),
    dispatch: PropTypes.func.isRequired,
    activityIndex: PropTypes.number.isRequired,
    answers: PropTypes.instanceOf(Map)
  },

  getInitialState() {
    return {
      text: '',
      showTextForm: false,
      showBubble: true,
      progress: 0,
      generalFeedbackView: false,
      showMessage: false,
      disableWriting: false,
      showSpinner: false
    };
  },

  toggleWriting() {
    this.setState({text: '', showTextForm: !this.state.showTextForm});
  },

  toggleWritingButton(value) {
    this.setState({disableWriting: value});
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  restartAudioAndText() {
    this.setState({showBubble: true});
  },

  cancel() {
    this.props.dispatch(NavigationState.popRoute());
  },

  setText(text) {
    this.setState({text});
  },

  async save(phase, attachmentType, attachmentPath) {

    this.setState({showSpinner: true});

    if (attachmentType === 'text') {
      this.toggleWriting();
    }

    try {
      var body = await formRequestBody(
        phase,
        attachmentType,
        this.state.text,
        this.props.activityIndex,
        this.props.answers
      );

      try {
        var wasSuccessful = await save(attachmentPath, attachmentType, body);

        if (wasSuccessful.success === true) {
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
  },

  error() {
    this.setState({showSpinner: false});
    Alert.alert('Ohops!', 'Jokin meni pieleen! Tarkista nettiyhteys tai yritä myöhemmin uudelleen!',
    [{text: 'Ok', onPress: () => this.props.dispatch(NavigationState.resetRoute())}]);
  },

  showConfirmationMessage() {
    this.setState({showMessage: true});
  },

  closeConfirmationMessage(phase) {
    this.setState({showMessage: false});
    this.continue(phase);
  },

  continue(phase) {
    if (phase === 'activities') {
      this.props.dispatch(NavigationState.pushRoute({key: 'NewRound', allowReturn: false}));
    }
    else if (phase === 'moods') {
      this.setState({showTextForm: false, showSpinner: false, showBubble: true, progress: 0, generalFeedbackView: true});
      this.props.dispatch(NavigationState.pushRoute({key: 'Record', allowReturn: false}));
    }
    else if (phase === 'general') {
      this.props.dispatch(NavigationState.pushRoute({key: 'End', allowReturn: false}));
    }
  },

  renderBubble(text) {
    if (this.state.showBubble === true) {
      var style;

      if (text === 'moodFeedback' || text === 'generalFeedback') {
        style = {top: 85, left: 180, margin: 30, fontSize: 18, size: 0.4};

      }
      else {
        style = {top: 45, left: 40, margin: 50, fontSize: 17, size: 0.6};
      }

      return (
        <SpeechBubble
          text={text}
          bubbleType={'puhekupla_oikea'}
          hideBubble={this.hideBubble}
          style={style}/>
      );
    }
    else {
      return null;
    }
  },

  renderTextForm(phase) {
    return (
      <TextForm toggleWriting={this.toggleWriting} phase={phase} save={this.save} setText={this.setText}/>
    );
  },

  render() {
    var phase;
    var saveWasSuccesful;
    var speechBubble;

    if (this.props.activityIndex === -1) {
      if (this.state.generalFeedbackView === false) {
        phase = 'moods';
        speechBubble = this.renderBubble('moodFeedback');
        var titlePanel = (
          <TouchableOpacity onPress={this.cancel}>
            <Image
              source={getImage('nappula_takaisin')}
              style={[styles.returnButton, getSizeByHeight('nappula_takaisin', 0.15)]}/>
          </TouchableOpacity>
        );
      }
      else {
        phase = 'general';
        speechBubble = this.renderBubble('generalFeedback');
      }
    }
    else {
      phase = 'activities';
      titlePanel = (
        <TitlePanel
          activityIndex={this.props.activityIndex}
          savedActivities={this.props.savedActivities}
          dispatch={this.props.dispatch}/>
      );
      speechBubble = this.renderBubble('record');
    }

    if (this.state.showTextForm === true) {
      var textForm = this.renderTextForm(phase);
    }

    if (this.state.showMessage === true) {
      saveWasSuccesful = <SaveConfirmationWindow phase={phase} closeWindow={this.closeConfirmationMessage}/>;
    }

    if (this.state.showSpinner === true) {
      return (
          <LoadingSpinner/>
        );
    }

    return (
      <Image source={getImage('tausta_perus')} style={styles.container}>
        <Image
          source={getImage('tausta_kapea')}
          style={[styles.leftColumn, getSizeByWidth('tausta_kapea', 0.6)]}>
            {titlePanel}
            <AudioRecorder save={this.save} toggleWritingButton={this.toggleWritingButton} phase={phase}/>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                disabled={this.state.disableWriting}
                onPress={this.toggleWriting}>
                <Image
                  source={getImage('nappula_kirjoita')}
                  style={[
                    getSizeByHeight('nappula_kirjoita', 0.1),
                    {opacity: this.state.disableWriting ? 0.4 : 1,
                      backgroundColor: this.state.disableWriting ? 'gray' : 'white'}]}/>
              </TouchableOpacity>
            </View>
        </Image>
        <View style={styles.rightColumn}>
            <Hemmo image={'hemmo'} size={0.7} restartAudioAndText={this.restartAudioAndText}/>

            <TouchableOpacity
              onPress={this.save.bind(this, phase, 'skipped')}
              style={styles.skipButtonHighlight}>
              <Image
                source={getImage('nappula_ohita')}
                style={[styles.skipButton, getSizeByHeight('nappula_ohita', 0.1)]}/>
            </TouchableOpacity>
        </View>
        {textForm}
        {speechBubble}
        {saveWasSuccesful}
      </Image>
    );
  }
});

export default connect(
  state => ({
    savedActivities: state.getIn(['user', 'currentUser', 'answers', 'activities']),
    activityIndex: state.getIn(['user', 'currentUser', 'activityIndex']),
    answers: state.getIn(['user', 'currentUser', 'answers'])
  })
)(RecordViewContainer);
