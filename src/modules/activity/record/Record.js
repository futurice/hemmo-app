import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import AudioRecorder from '../../../components/AudioRecorder';
import TitlePanel from '../../../components/TitlePanel';
import SpeechBubbleView from '../../../components/SpeechBubbleView';
import WritingPanel from '../../../components/WritingPanel';
import * as NavigationState from '../../../modules/navigation/NavigationState';
import * as UserState from '../../../modules/user/UserState';
import {put, post} from '../../../utils/api';
import {getSize, getImage} from '../../../services/graphics';

import {
  TouchableOpacity,
  Image,
  View
} from 'react-native';

var activities = require('../activities.js');
var styles = require('./styles.js');

const Record = React.createClass({

  propTypes: {
    savedActivities: PropTypes.instanceOf(List),
    dispatch: PropTypes.func.isRequired,
    activityIndex: PropTypes.number.isRequired,
    emotions: PropTypes.instanceOf(Map)
  },

  getInitialState() {
    return {
      text: '',
      enableWriting: false,
      showBubble: true,
      progress: 0,
      generalFeedbackView: false
    };
  },

  enableWriting() {
    this.setState({enableWriting: true});
  },

  disableWriting() {
    this.setState({enableWriting: false});
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  cancel() {
    this.props.dispatch(NavigationState.popRoute());
  },

  setText(e) {
    this.setState({text: e.nativeEvent.text});
  },

  // saveRecording(file, phase) {
  //   console.log('Coming soon! ' + file);
  //   console.log('phase is ' + phase);
  //   var answer = 'empty';
  //   var question = 'Kerro tarkemmin';
  //   var type = 'multipart/form-data';
  //
  //   post('/content', {contentType: type, answer, question})
  //     .then(
  //       result => {
  //         console.log('contentId ' + result.contentId);
  //         put('/attachment/' + result.contentId, {file})
  //           .then(res => {
  //             console.log('result from upload is ' + res.contentId);
  //             this.continue(res.contentId);
  //           });
  //       }
  //     );
  //   this.continue();
  // },

  save(phase, attachmentType) {
    var questions = [];

    if (phase === 'activities') {
      questions = this.getActivities();
      questions = this.getAttachment(attachmentType, 'Millaista se oli?', questions);
      console.log('ACTIVITIES ' + JSON.stringify(questions));
    }
    else if (phase === 'moods') {
      var moods = this.getMoods();
      questions = this.getAttachment(attachmentType, 'Miltä sinusta tuntui?', questions);
      console.log('MOODS ' + moods + ' - ' + JSON.stringify(questions));
    }
    else if (phase === 'general') {
      questions = this.getAttachment(attachmentType, 'Miltä sinusta tuntui?', questions);
      console.log('GENERAL ' + JSON.stringify(questions));
    }

    this.continue(phase);
  },

  getActivities() {
    var questions = [];

    var curr = this.props.activityIndex;
    var mainIndex = this.props.savedActivities.get(curr).get('main');
    var subIndex = this.props.savedActivities.get(curr).get('sub');

    var main = activities[mainIndex].get('key');
    var sub = activities[mainIndex].get('subActivities').get(subIndex);
    var like = this.props.savedActivities.get(curr).get('thumb');

    questions.push({question: 'Mitä teitte?', answer: main});
    questions.push({question: 'Mitä teitte (tarkemmin)?', answer: sub});
    questions.push({question: 'Millaista se oli?', like});

    return questions;
  },

  getMoods() {
    var moods = [...this.props.emotions.get('emotions')];
    return moods;
  },

  getAttachment(attachmentType, question, questions) {

    if (attachmentType === 'text') {
      questions.push({question, answer: this.state.text});
      return questions;
    }
    else if (attachmentType === 'audio') {
      console.log('TODO!');
    }

    return questions;
  },

  continue(phase) {
    if (phase === 'activities') {
      // this.props.dispatch(UserState.saveAnswer
      //(this.props.activityIndex, 'text', this.state.text, contentId));
      this.props.dispatch(NavigationState.pushRoute({key: 'NewRound', allowReturn: false}));
    }
    else if (phase === 'moods') {
      // this.props.dispatch(UserState.saveAnswer(null, 'emotion_text', this.state.text, contentId));
      this.setState({enableWriting: false, showBubble: true, progress: 0, generalFeedbackView: true});
      this.props.dispatch(NavigationState.pushRoute({key: 'Record', allowReturn: false}));
    }
    else if (phase === 'general') {
      // this.props.dispatch(UserState.saveAnswer(null, 'general', this.state.text, contentId));
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
            source={getImage('nappula_kirjoita')}
            style={getSize('nappula_kirjoita', 0.1)}/>
        </TouchableOpacity>
      </View>
    );
  },

  renderWritingPanel() {
    return (
      <WritingPanel disableWriting={this.disableWriting} setText={this.setText}/>
    );
  },

  render() {

    var phase;
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

    if (this.state.enableWriting === true) {
      var writingView = this.renderWritingPanel();
      var saveOrWriteButton = this.renderButton('nappula_tallenna', this.save.bind(this, phase, 'text'));
    }
    else {
      saveOrWriteButton = this.renderButton('nappula_kirjoita', this.enableWriting);

    }
    return (
      <Image source={getImage('tausta_perus')} style={styles.container}>
        <Image source={getImage('tausta_kapea')} style={[styles.leftColumn, getSize('tausta_kapea', 0.9)]}>
          {titlePanel}
          {actionPanel}
          {saveOrWriteButton}
        </Image>
        <View style={styles.rightColumn}>
          <View style={styles.hemmoRow}>
            <Image source={getImage('hemmo_keski')} style={getSize('hemmo_keski', 0.7)}/>
          </View>
          <View style={styles.skipRow}>
            <TouchableOpacity onPress={this.save.bind(this, phase, 'skip')} style={styles.skipButtonHighlight}>
              <Image
                source={getImage('nappula_ohita')}
                style={[styles.skipButton, getSize('nappula_ohita', 0.1)]}/>
            </TouchableOpacity>
          </View>
        </View>
        {writingView}
        {speechBubble}
      </Image>
    );
  }
});

export default Record;
