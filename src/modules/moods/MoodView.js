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
  View
} from 'react-native';

var moods = require('../../data/moods.js');
var styles = require('./styles.js');

const MoodView = React.createClass({

  propTypes: {
    activityIndex: PropTypes.number.isRequired,
    dispatch: PropTypes.func
  },

  getInitialState() {
    return {
      selectedMoods: List(),
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
    this.props.dispatch(UserState.saveAnswer(null, 'moods', this.state.selectedMoods));
    this.props.dispatch(NavigationState.pushRoute({key: 'Record', allowReturn: true}));
  },

  /* If the mood hasn't been checked yet, it is added to an array what holds the information
  about the selected moods. If a checked mood is clicked again,
  it is unchecked and removed from the array*/
  selectMood(mood) {
    var notSelected = false;

    for (var j = 0; j < this.state.selectedMoods.size; j++) {
      if (mood === this.state.selectedMoods.get(j)) {
        var tmp = this.state.selectedMoods.slice();
        tmp = tmp.filter(function deleteRoute(item) { return item !== mood; });
        this.setState({selectedMoods: tmp});
        notSelected = true;
      }
    }
    /* Mood was not selected, so it is not added to the array */
    if (notSelected === false) {
      this.setState({selectedMoods: this.state.selectedMoods.concat(mood)});
    }
  },

  render() {

    var moodViews = [];

    for (var i = 0; i < moods.length; i++) {
      var checked = null;
      for (var j = 0; j < this.state.selectedMoods.size; j++) {
        if (moods[i] === this.state.selectedMoods.get(j)) {
          checked = (<Image
                      source={getImage('valittu')}
                      style={[styles.check, getSizeByHeight('valittu', 0.1)]}/>);
        }
      }
      var photo;

      if (i === moods.length - 1) {
        photo = (<Image
          source={getImage(moods[i])}
          style={[getSizeByWidth(moods[i], 0.17),
            {marginBottom: getSizeByWidth('ympyra_keski', 0.17).height + 5}]}/>
        );
      }
      else {
        photo = (<Image
          source={getImage(moods[i])}
          style={[getSizeByWidth(moods[i], 0.17)]}/>);
      }

      moodViews.push(
        <TouchableOpacity
          key={moods[i]}
          style={[styles.mood]}
          onPress={this.selectMood.bind(this, moods[i])}>
            {photo}
          {checked}
        </TouchableOpacity>
      );
    }

    var speechBubble = this.renderBubble('moods');

    return (
      <Image source={getImage('tausta_perus2')} style={styles.container}>
        <Image source={getImage('tausta_levea')} style={styles.moodContainer}>
          <View style={styles.moodColumn}>
            {moodViews}
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

export default MoodView;
