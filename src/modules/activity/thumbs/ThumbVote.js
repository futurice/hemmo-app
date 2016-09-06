import React, {PropTypes} from 'react';
import {List} from 'immutable';
import TitlePanel from '../../../components/TitlePanel';
import Hemmo from '../../../components/Hemmo';
import * as UserState from '../../../modules/user/UserState';
import * as NavigationState from '../../../modules/navigation/NavigationState';
import SpeechBubble from '../../../components/SpeechBubble';
import {getSizeByHeight, getSizeByWidth, getImage} from '../../../services/graphics';

import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';

var styles = require('./styles.js');
var thumb_values = [
  {value: 1, text: 'peukku_ylos_0'},
  {value: 0, text: 'peukku_keski_0'},
  {value: -1, text: 'peukku_alas_0'}
];

//TODO: Separate rendering to smaller components.
const ThumbVote = React.createClass({

  propTypes: {
    savedActivities: PropTypes.instanceOf(List),
    dispatch: PropTypes.func.isRequired,
    activityIndex: PropTypes.number.isRequired
  },

  getInitialState() {
    return {
      showBubble: true
    };
  },

  vote(vote) {
    this.props.dispatch(
      UserState.saveAnswer(this.props.activityIndex, 'thumb', vote)
    );

    this.props.dispatch(
      NavigationState.pushRoute({key: 'Record', allowReturn: true})
    );
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  restartAudioAndText() {
    this.setState({showBubble: true});
  },

  renderBubble(text, i, j) {
    if (this.state.showBubble === true) {
      return (
        <SpeechBubble
          text={text}
          hideBubble={this.hideBubble}
          bubbleType={'puhekupla_oikea'}
          style={{top: 80, left: 100, margin: 15, fontSize: 15, size: 0.5}}
          maIndex={i}
          saIndex={j}/>
      );
    }
    else {
      return null;
    }
  },

  renderThumbButtons() {
    var thumbs = [];

    for (var i = 0; i <= 2; i++) {
      thumbs.push(
        <View key={i}>
          <TouchableOpacity onPress={this.vote.bind(this, thumb_values[i].value)}>
            <Image
              source={getImage(thumb_values[i].text)}
              style={[styles.voteButton, getSizeByHeight(thumb_values[i].text, 0.25)]}/>
          </TouchableOpacity>
        </View>
      );
    }
    return thumbs;
  },

  render() {

    var titlePanel = (
      <TitlePanel
        activityIndex={this.props.activityIndex}
        savedActivities={this.props.savedActivities}
        dispatch={this.props.dispatch}/>
    );

    var thumbs = this.renderThumbButtons();

    var actionPanel = (
      <View style={styles.actionRow}>
        {thumbs}
      </View>
    );

    var j = this.props.savedActivities.get(this.props.activityIndex).get('sub');
    var i = this.props.savedActivities.get(this.props.activityIndex).get('main');
    var speechBubble = this.renderBubble('subActivity', i, j);

    return (
      <Image source={getImage('tausta_perus')} style={styles.container}>
          <Image source={getImage('tausta_kapea')} style={[styles.leftColumn, getSizeByWidth('tausta_kapea', 0.6)]}>
            {titlePanel}
            {actionPanel}
          </Image>
        <View style={styles.rightColumn}>
          <Hemmo image={'hemmo_keski'} size={0.7} restartAudioAndText={this.restartAudioAndText}/>
        </View>
        {speechBubble}
      </Image>
    );
  }
});

export default ThumbVote;
