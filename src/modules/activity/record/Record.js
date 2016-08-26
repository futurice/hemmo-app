import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import AudioRecorder from '../../../components/AudioRecorder';
import TitlePanel from '../../../components/TitlePanel';
import Hemmo from '../../../components/Hemmo';
import SpeechBubbleView from '../../../components/SpeechBubbleView';
import SaveConfirmationWindow from '../../../components/SaveConfirmationWindow';
import WritingPanel from '../../../components/WritingPanel';
import * as NavigationState from '../../../modules/navigation/NavigationState';
import {getSize, getImage} from '../../../services/graphics';
import {save} from '../../../services/save';

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
      enableWriting: false,
      showBubble: true,
      progress: 0,
      generalFeedbackView: false,
      showConfirm: false
    };
  },

  enableWriting() {
    this.setState({enableWriting: true});
  },

  disableWriting() {
    this.setState({text: '', enableWriting: false});
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
      this.disableWriting();
    }
    save(phase,
      attachmentType,
      attachmentPath,
      this.state.text,
      this.props.activityIndex,
      this.props.answers)
       .then(() => {
         if (attachmentType === 'audio') {
           this.confirmSave();
         }
         else {
           this.continue(phase);
         }
       });
    // this.continue(phase);
  },

  confirmSave() {
    this.setState({showConfirm: true});
  },

  closeConfirmationWindow(phase) {
    this.setState({showConfirm: false});
    this.continue(phase);
  },

  continue(phase) {
    if (phase === 'activities') {
      this.props.dispatch(NavigationState.pushRoute({key: 'NewRound', allowReturn: false}));
    }
    else if (phase === 'moods') {
      this.setState({enableWriting: false, showBubble: true, progress: 0, generalFeedbackView: true});
      this.props.dispatch(NavigationState.pushRoute({key: 'Record', allowReturn: false}));
    }
    else if (phase === 'general') {
      this.props.dispatch(NavigationState.pushRoute({key: 'End', allowReturn: false}));
    }
  },

  renderBubble(text) {
    if (this.state.showBubble === true) {
      return (
        <SpeechBubbleView
          text={text}
          bubbleType={'puhekupla_oikea'}
          hideBubble={this.hideBubble}
          style={{top: 100, left: 100, margin: 30, fontSize: 16, size: 0.5}}/>
      );
    }
    else {
      return null;
    }
  },

  renderRecordPanel(phase) {
    return (
      <AudioRecorder save={this.save} phase={phase}/>
    );
  },

  renderButton(text, onPress) {
    return (
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={getImage(text)}
            style={getSize(text, 0.1)}/>
        </TouchableOpacity>
      </View>
    );
  },

  renderWritingPanel(phase) {
    return (
      <WritingPanel disableWriting={this.disableWriting} phase={phase} save={this.save} setText={this.setText}/>
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
              style={[styles.returnButton, getSize('nappula_takaisin', 0.15)]}/>
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

    var actionPanel = this.renderRecordPanel(phase);
    var writeButton;

    if (this.state.enableWriting === true) {
      var writingView = this.renderWritingPanel(phase);
    }

    writeButton = this.renderButton('nappula_kirjoita', this.enableWriting);

    if (this.state.showConfirm === true) {
      saveWasSuccesful = <SaveConfirmationWindow phase={phase} closeWindow={this.closeConfirmationWindow}/>;
    }

    return (
      <Image source={getImage('tausta_perus')} style={styles.container}>
        <Image source={getImage('tausta_kapea')} style={[styles.leftColumn, getSize('tausta_kapea', 0.9)]}>
          {titlePanel}
          {actionPanel}
          {writeButton}
        </Image>
        <View style={styles.rightColumn}>
          <View style={styles.hemmoRow}>
            <Hemmo image={'hemmo'} size={0.7} restartAudioAndText={this.restartAudioAndText}/>
          </View>
          <View style={styles.skipRow}>
            <TouchableOpacity
              onPress={this.save.bind(this, phase, 'skipped')}
              style={styles.skipButtonHighlight}>
              <Image
                source={getImage('nappula_ohita')}
                style={[styles.skipButton, getSize('nappula_ohita', 0.1)]}/>
            </TouchableOpacity>
          </View>
        </View>
        {writingView}
        {speechBubble}
        {saveWasSuccesful}
      </Image>
    );
  }
});

export default Record;
