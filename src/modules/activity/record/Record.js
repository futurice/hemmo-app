import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import AudioRecorder from '../../../components/AudioRecorder';
import TitlePanel from '../../../components/TitlePanel';
import Hemmo from '../../../components/Hemmo';
import SpeechBubble from '../../../components/SpeechBubble';
import SaveConfirmationWindow from '../../../components/SaveConfirmationWindow';
import WritingPanel from '../../../components/WritingPanel';
import * as NavigationState from '../../../modules/navigation/NavigationState';
import {getSizeByHeight, getSizeByWidth, getImage} from '../../../services/graphics';
import {save, formRequestBody} from '../../../services/save';

import {
  TouchableOpacity,
  Image,
  View
} from 'react-native';

var styles = require('./styles.js');

const Record = React.createClass({

  propTypes: {
    savedActivities: PropTypes.instanceOf(List),
    dispatch: PropTypes.func.isRequired,
    activityIndex: PropTypes.number.isRequired,
    answers: PropTypes.instanceOf(Map)
  },

  getInitialState() {
    return {
      text: '',
      showWritingPanel: false,
      showBubble: true,
      progress: 0,
      generalFeedbackView: false,
      showMessage: false,
      disableWriting: false
    };
  },

  toggleWriting() {
    this.setState({text: '', showWritingPanel: !this.state.showWritingPanel});
  },

  toggleWritingButton(value) {
    this.setState({disableWriting: value});
    console.log('disabled ' + this.state.disableWriting);
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

  save(phase, attachmentType, attachmentPath) {
    if (attachmentType === 'text') {
      this.toggleWriting();
    }

    formRequestBody(phase, attachmentType, this.state.text, this.props.activityIndex, this.props.answers)
      .then(body => save(attachmentPath, attachmentType, body))
        .then(() => {
          if (attachmentType === 'audio') {
            this.showConfirmationMessage();
          }
          else {
            this.continue(phase);
          }
        });
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
      this.setState({showWritingPanel: false, showBubble: true, progress: 0, generalFeedbackView: true});
      this.props.dispatch(NavigationState.pushRoute({key: 'Record', allowReturn: false}));
    }
    else if (phase === 'general') {
      this.props.dispatch(NavigationState.pushRoute({key: 'End', allowReturn: false}));
    }
  },

  renderBubble(text) {
    if (this.state.showBubble === true) {
      return (
        <SpeechBubble
          text={text}
          bubbleType={'puhekupla_oikea'}
          hideBubble={this.hideBubble}
          style={{top: 45, left: 40, margin: 40, fontSize: 15, size: 0.6}}/>
      );
    }
    else {
      return null;
    }
  },

  renderWritingPanel(phase) {
    return (
      <WritingPanel toggleWriting={this.toggleWriting} phase={phase} save={this.save} setText={this.setText}/>
    );
  },

  render() {
    var phase;
    var saveWasSuccesful;
    var speechBubble;

    if (this.props.activityIndex === -1) {
      if (this.state.generalFeedbackView === false) {
        phase = 'moods';
        speechBubble = this.renderBubble('emotionFeedback');
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

    if (this.state.showWritingPanel === true) {
      var writingView = this.renderWritingPanel(phase);
    }

    if (this.state.showMessage === true) {
      saveWasSuccesful = <SaveConfirmationWindow phase={phase} closeWindow={this.closeConfirmationMessage}/>;
    }

    return (
      <Image source={getImage('tausta_perus')} style={styles.container}>
        <Image source={getImage('tausta_kapea')} style={[styles.leftColumn, getSizeByWidth('tausta_kapea', 0.6)]}>
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
        {writingView}
        {speechBubble}
        {saveWasSuccesful}
      </Image>
    );
  }
});

export default Record;
