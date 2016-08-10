import React, {PropTypes} from 'react';
import {List} from 'immutable';
import Button from '../../../components/Button';
import AudioRecorder from '../../../components/AudioRecorder';
import TitlePanel from '../../../components/TitlePanel';
import SpeechBubbleView from '../../../components/SpeechBubbleView';
import * as NavigationState from '../../../modules/navigation/NavigationState';
import * as UserState from '../../../modules/user/UserState';
import {post} from '../../../utils/api';
import {getSize, getImage} from '../../../services/graphics';

import {
  TextInput,
  TouchableOpacity,
  Image,
  View
} from 'react-native';

var graphics = require('../../../components/graphics.js');
var styles = require('./styles.js');

const Record = React.createClass({

  propTypes: {
    savedActivities: PropTypes.instanceOf(List),
    dispatch: PropTypes.func.isRequired,
    activityIndex: PropTypes.number.isRequired
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

  saveText() {
    /* Ei välttämättä tarvitse tallettaa stateen mutta pidetään tämä nyt täällä vielä toistaiseksi :D */
    if (this.state.text === '') {
      var answer = 'empty';
    }
    else {
      answer = this.state.text;
    }
    var question = 'Kertoisitko siitä lisää?';
    var type = 'text';

    post('/content/', {contentType: type, answer, question})
      .then(
        result => {
          this.continue(result.contentId);
        }
      );
  },

  saveAnswers(type) {
    console.log('Coming soon! ' + type);
    this.continue();
  },

  skip() {
    this.continue();
  },

  continue(contentId) {
    if (this.props.activityIndex === -1) {
      /* QUESTION was 'How did you feel?' */
      if (this.state.generalFeedbackView === false) {
        this.props.dispatch(UserState.saveAnswer(null, 'emotion_text', this.state.text, contentId));
        this.setState({enableWriting: false, showBubble: true, progress: 0, generalFeedbackView: true});
        this.props.dispatch(NavigationState.pushRoute({key: 'Record', allowReturn: false}));
      }
      /* QUESTION was 'Do you have anything else you want to tell me?' */
      else {
        this.props.dispatch(UserState.saveAnswer(null, 'general', this.state.text, contentId));
        this.props.dispatch(NavigationState.pushRoute({key: 'End', allowReturn: false}));
      }
    }
    /* QUESTION was 'What did you do during the visit?' */
    else {
      this.props.dispatch(UserState.saveAnswer(this.props.activityIndex, 'text', this.state.text, contentId));
      this.props.dispatch(NavigationState.pushRoute({key: 'NewRound', allowReturn: false}));
    }
  },

  renderBubble(text) {
    if (this.state.showBubble === true) {
      return (
        <SpeechBubbleView
          text={text}
          bubbleType={graphics.get('puhekupla_oikea')}
          hideBubble={this.hideBubble}
          style={{top: 110, left: 140, height: 160, width: 265, margin: 15, fontSize: 12}}/>
      );
    }
    else {
      return null;
    }
  },

  renderRecordPanel() {
    return (
      <AudioRecorder saveAnswers={this.saveAnswers}/>
    );
  },

  renderButton(icon, text, onPress) {
    return (
      <Button
      style={styles.writeButton} highlightStyle={styles.writeButtonHighlight}
      onPress={onPress} text={text} icon={icon}/>
    );
  },

  renderWritingPanel() {
    return (
      <View style={styles.writingContainer}>
        <View style={styles.textInput}>
          <TextInput
            multiline = {true}
            numberOfLines = {30}
            maxLength = {150}
            onChange = {this.setText}
            underlineColorAndroid = 'transparent'
            style={styles.textForm}/>
        </View>
        <TouchableOpacity onPress={this.disableWriting} style={styles.closeButton}>
          <Image source={graphics.get('nappula_rasti')} style={styles.closeButton}/>
        </TouchableOpacity>
      </View>
    );
  },

  render() {

    var speechBubble;

    if (this.props.activityIndex === -1) {
      if (this.state.generalFeedbackView === false) {
        speechBubble = this.renderBubble('emotionFeedback');
        var titlePanel = (
          <TouchableOpacity onPress={this.cancel}>
            <Image source={graphics.get('nappula_takaisin')} style={styles.returnButton}/>
          </TouchableOpacity>
        );
      }
      else {
        speechBubble = this.renderBubble('generalFeedback');
      }
    }
    else {
      titlePanel = (
        <TitlePanel
        activityIndex={this.props.activityIndex}
        savedActivities={this.props.savedActivities}
        dispatch={this.props.dispatch}/>
      );
      speechBubble = this.renderBubble('record');
    }

    var actionPanel = this.renderRecordPanel();

    if (this.state.enableWriting === true) {
      var writingView = this.renderWritingPanel();
      // buttonPanel = this.renderButtonPanel('save', 'Tallenna', this.saveText);
      var saveOrWriteButton = this.renderButton('save', 'Tallenna', this.saveText);
    }
    else {
      // buttonPanel = this.renderButtonPanel('pencil', 'Kirjoita', this.enableWriting);
      saveOrWriteButton = this.renderButton('pencil', 'Kirjoita', this.enableWriting);

    }
    return (
      <Image source={getImage('tausta_perus2')} style={styles.container}>
        <Image source={getImage('tausta_kapea')} style={[styles.leftColumn, getSize('tausta_kapea')]}>
          {titlePanel}
          {actionPanel}
          {saveOrWriteButton}
        </Image>
        <View style={styles.rightColumn}>
          <Image source={graphics.get('hemmo_keski')} style={{height: 180, width: 140}}/>
          <Button
            style={styles.skipButton} highlightStyle={styles.skipButtonHighlight}
            onPress={this.skip} text={'Ohita'} icon={'angle-right'}/>
        </View>
        {writingView}
        {speechBubble}
      </Image>
    );
  }
});

export default Record;
