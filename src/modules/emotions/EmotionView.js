import React, {PropTypes} from 'react';
import {List} from 'immutable';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as UserState from '../../modules/user/UserState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import Hemmo from '../../components/Hemmo';
import SpeechBubbleView from '../../components/SpeechBubbleView';
import Button from '../../components/Button';
import {
  Text,
  TouchableOpacity,
  Dimensions,
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
        hideBubble={this.hideBubble}
        position={{x: 10, y: 150, triangle: 350}}/>);
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
          checked = <Icon name={'check'} size={25} style={styles.check}/>;
        }
      }
      emotionViews.push(
        <View key={emotions[i]} style={[styles.emotion, {height: emotionSize, width: emotionSize}]}>
          <TouchableOpacity style={styles.highlight} onPress={this.selectEmotion.bind(this, emotions[i])}>
            <Text>
              {emotions[i]}
            </Text>
          </TouchableOpacity>
          {checked}
        </View>
      );
    }

    var speechBubble = this.renderBubble('emotions');

    return (
      <View style={styles.container}>
        <View style={styles.emotionColumn}>
          {emotionViews}
        </View>
        <View style={styles.hemmoColumn}>
          <Hemmo x={0} y={100}/>
        </View>
        <Button
          style={styles.saveButton} highlightStyle={styles.buttonHighlight}
          onPress={this.save} text={'Tallenna'} icon={'save'}/>
        {speechBubble}
      </View>
    );
  }
});

export default EmotionView;
