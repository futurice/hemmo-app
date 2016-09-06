import React, {PropTypes} from 'react';
import {List} from 'immutable';
import * as UserState from '../../modules/user/UserState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import SpeechBubble from '../../components/SpeechBubble';
import Hemmo from '../../components/Hemmo';
import {getSizeByHeight, getSizeByWidth, getImage} from '../../services/graphics';

import {
  TouchableOpacity,
  Image,
  Text,
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

  restartAudioAndText() {
    this.setState({showBubble: true});
  },

  renderBubble(text) {
    if (this.state.showBubble === true) {
      return (<SpeechBubble
        text={text}
        bubbleType={'puhekupla_oikea'}
        hideBubble={this.hideBubble}
        style={{top: 110, left: 100, margin: 30, fontSize: 14, size: 0.5}}/>);
    }
    else {
      return null;
    }
  },

  save() {
    this.props.dispatch(UserState.saveAnswer(null, 'emotions', this.state.selectedEmotions));
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

    for (var i = 0; i < emotions.length; i++) {
      var checked = null;
      for (var j = 0; j < this.state.selectedEmotions.size; j++) {
        if (emotions[i] === this.state.selectedEmotions.get(j)) {
          checked = <Image source={getImage('valittu')} style={[styles.check, getSizeByHeight('valittu', 0.1)]}/>;
        }
      }
      var photo;

      if (i === emotions.length - 1) {
        photo = (
          <Image
            source={getImage('ympyra_keski')}
            style={[styles.other,
                getSizeByWidth('ympyra_keski', 0.17),
                {marginBottom: getSizeByWidth('ympyra_keski', 0.17).height + 5}]}>
            <Text style={styles.font}>Muu</Text>
          </Image>
        );
      }
      else {
        photo = (<Image
          source={getImage(emotions[i])}
          style={[getSizeByWidth(emotions[i], 0.17)]}/>);
      }

      emotionViews.push(
        <TouchableOpacity
          key={emotions[i]}
          style={[styles.emotion]}
          onPress={this.selectEmotion.bind(this, emotions[i])}>
            {photo}
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
          <View style={styles.hemmo}>
            <Hemmo
              key={'hemmo'}
              image={'hemmo_keski'}
              size={0.45} restartAudioAndText={this.restartAudioAndText}
              />
          </View>
          <TouchableOpacity onPress={this.save} style={styles.saveButton}>
            <Image source={getImage('nappula_seuraava')} style={getSizeByHeight('nappula_seuraava', 0.1)}/>
          </TouchableOpacity>
          {speechBubble}
        </Image>
      </Image>
    );
  }
});

export default EmotionView;
