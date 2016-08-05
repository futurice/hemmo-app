import React, {PropTypes} from 'react';
import {List} from 'immutable';
import Icon from 'react-native-vector-icons/FontAwesome';
import TitlePanel from '../../../components/TitlePanel';
import * as UserState from '../../../modules/user/UserState';
import * as NavigationState from '../../../modules/navigation/NavigationState';
import SpeechBubbleView from '../../../components/SpeechBubbleView';

import {
  View,
  Image
} from 'react-native';

var graphics = require('../../../components/graphics.js');
var styles = require('./styles.js');

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
    this.props.dispatch(UserState.saveAnswer(this.props.activityIndex, 'thumb', vote));
    this.props.dispatch(NavigationState.pushRoute({key: 'Record', allowReturn: true}));
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  renderBubble(text, i, j) {
    if (this.state.showBubble === true) {
      return (
        <SpeechBubbleView
          text={text}
          hideBubble={this.hideBubble}
          bubbleType={graphics.get('puhekupla_oikea')}
          style={{top: 150, left: 220, height: 110, width: 180, margin: 15, fontSize: 12}}
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
    var icons = [{icon: 'thumbs-up'}, {icon: 'meh-o'}, {icon: 'thumbs-down'}];

    for (var i = 0; i <= 2; i++) {
      thumbs.push(
        <View key={i}>
          <Icon
            onPress={this.vote.bind(this, i)}
            name={icons[i].icon}
            size={100}
            style={styles.voteButton}/>
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
      <Image source={graphics.get('tausta_perus2')} style={styles.container}>
        <Image source={graphics.get('tausta_kapea')} style={styles.leftColumn}>
          {titlePanel}
          {actionPanel}
        </Image>
        <View style={styles.rightColumn}>
          <Image source={graphics.get('hemmo_keski')} style={{height: 180, width: 140}}/>
        </View>
        {speechBubble}
      </Image>
    );
  }
});

export default ThumbVote;
