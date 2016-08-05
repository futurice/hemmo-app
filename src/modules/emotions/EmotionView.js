import React, {PropTypes} from 'react';
import {List} from 'immutable';
import * as UserState from '../../modules/user/UserState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import SpeechBubbleView from '../../components/SpeechBubbleView';
import {
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  View
} from 'react-native';

var emotions = require('./emotions.js');
var graphics = require('../../components/graphics.js');
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
        bubbleType={graphics.get('puhekupla_oikea')}
        hideBubble={this.hideBubble}
        style={{top: 60, left: 200, height: 150, width: 250, margin: 30, fontSize: 12}}/>);
    }
    else {
      return null;
    }
  },

  save() {
    this.props.dispatch(UserState.saveAnswer(null,
      'emotions', this.state.selectedEmotions));
    this.props.dispatch(NavigationState.pushRoute({key: 'Record', allowReturn: true}));
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
    var emotionSize = Dimensions.get('window').height / 3.5;

    for (var i = 0; i < emotions.length; i++) {
      var checked = null;
      for (var j = 0; j < this.state.selectedEmotions.size; j++) {
        if (emotions[i] === this.state.selectedEmotions.get(j)) {
          checked = <Image source={graphics.get('valittu')} style={styles.check}/>;
        }
      }
      emotionViews.push(
        <TouchableOpacity
          key={emotions[i]}
          style={styles.highlight}
          onPress={this.selectEmotion.bind(this, emotions[i])}>
          <Image
            source={graphics.get('ympyra_keski')}
            style={[styles.emotion, {height: emotionSize, width: emotionSize}]}>
            <Text> {emotions[i]} </Text>
          </Image>
          {checked}
        </TouchableOpacity>
      );
    }

    var speechBubble = this.renderBubble('emotions');

    return (
      <Image source={graphics.get('tausta_perus2')} style={styles.container}>
        <Image source={graphics.get('tausta_levea')} style={styles.emotionContainer}>
          <View style={styles.emotionColumn}>
            {emotionViews}
          </View>
          <View style={styles.hemmoColumn}>
            <Image source={graphics.get('hemmo_keski')} style={{height: 180, width: 140, marginRight: 30}}/>
          </View>
          <TouchableOpacity onPress={this.save} style={styles.saveButton}>
            <Image source={graphics.get('nappula_seuraava')} style={{height: 30, width: 110}}/>
          </TouchableOpacity>
          {speechBubble}
        </Image>
      </Image>
    );
  }
});

export default EmotionView;
