import React, {PropTypes} from 'react';
import {List} from 'immutable';
import * as UserState from '../../modules/user/UserState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import SpeechBubbleView from '../../components/SpeechBubbleView';
import {post} from '../../utils/api';
import {getSize, getImage} from '../../services/graphics';

import {
  Text,
  TouchableOpacity,
  Image,
  View
} from 'react-native';

var emotions = require('./emotions.js');
var styles = require('./styles.js');

const EmotionView = React.createClass({

  propTypes: {
    activityIndex: PropTypes.number.isRequired,
    dispatch: PropTypes.func
  },

  getInitialState() {
    return {
      selectedEmotions: List(),
      showBubble: true
    };
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  renderBubble(text) {
    if (this.state.showBubble === true) {
      return (<SpeechBubbleView
        text={text}
        bubbleType={'puhekupla_oikea'}
        hideBubble={this.hideBubble}
        style={{top: 60, left: 200, margin: 30, fontSize: 12, size: 0.4}}/>);
    }
    else {
      return null;
    }
  },

  save() {

    var answer = JSON.stringify([...this.state.selectedEmotions]);
    var question = 'Miksi sinusta tuntui siltä?';
    var type = 'text';

    post('/content/', {contentType: type, answer, question})
      .then(
        result => {
          this.props.dispatch(UserState.saveAnswer(null, 'emotions', this.state.selectedEmotions));
          this.props.dispatch(NavigationState.pushRoute({key: 'Record', allowReturn: true}));
        }
      );
  },

  /* If the emotion hasn't been checked yet, it is added to an array what holds the information
  about the selected emotions. If a checked emotion is clicked again,
  it is unchecked and removed from the array*/
  selectEmotion(emotion) {
    var notSelected = false;

    for (var j = 0; j < this.state.selectedEmotions.size; j++) {
      if (emotion === this.state.selectedEmotions.get(j)) {
        var tmp = this.state.selectedEmotions.slice();
        tmp = tmp.filter(function deleteRoute(item) { return item !== emotion; });
        this.setState({selectedEmotions: tmp});
        notSelected = true;
      }
    }
    /* Emotion was not selected, so it is not added to the array */
    if (notSelected === false) {
      this.setState({selectedEmotions: this.state.selectedEmotions.concat(emotion)});
    }
  },

  render() {

    var emotionViews = [];

    for (var i = 0; i < emotions.length; i++) {
      var checked = null;
      for (var j = 0; j < this.state.selectedEmotions.size; j++) {
        if (emotions[i] === this.state.selectedEmotions.get(j)) {
          checked = <Image source={getImage('valittu')} style={[styles.check, getSize('valittu', 0.1)]}/>;
        }
      }
      emotionViews.push(
        <TouchableOpacity
          key={emotions[i]}
          style={[styles.highlight, getSize('ympyra_keski', 0.30)]}
          onPress={this.selectEmotion.bind(this, emotions[i])}>
          <Image
            source={getImage('ympyra_keski')}
            style={[styles.emotion, getSize('ympyra_keski', 0.30)]}>
            <Text style={styles.font}> {emotions[i]} </Text>
          </Image>
          {checked}
        </TouchableOpacity>
      );
    }

    var speechBubble = this.renderBubble('emotions');

    return (
      <Image source={getImage('tausta_perus2')} style={styles.container}>
        <Image source={getImage('tausta_levea')} style={styles.emotionContainer}>
          <View style={styles.emotionColumn}>
            {emotionViews}
          </View>
          <View style={styles.hemmoColumn}>
            <Image
              source={getImage('hemmo_keski')} style={[{marginRight: 30}, getSize('hemmo_keski', 0.45)]}/>
          </View>
          <TouchableOpacity onPress={this.save} style={styles.saveButton}>
            <Image source={getImage('nappula_seuraava')} style={getSize('nappula_seuraava', 0.1)}/>
          </TouchableOpacity>
          {speechBubble}
        </Image>
      </Image>
    );
  }
});

export default EmotionView;
