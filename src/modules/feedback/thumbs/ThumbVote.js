import React, {PropTypes} from 'react';
import {List} from 'immutable';
import Hemmo from '../../../components/Hemmo';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as UserState from '../../../modules/user/UserState';
import * as NavigationState from '../../../modules/navigation/NavigationState';
import SpeechBubbleView from '../../../components/SpeechBubbleView';

import {
  Text,
  View
} from 'react-native';

var styles = require('../styles.js');
var activities = require('../../activity/activities.js');

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
    this.props.dispatch(NavigationState.pushRoute({key: 'Record'}));
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  renderBubble(text, i, j) {
    if (this.state.showBubble === true) {
      return (<SpeechBubbleView
        text={text}
        hideBubble={this.hideBubble}
        position={{x: 15, y: 320, triangle: 120}}
        textIndex={i}
        subTextIndex={j}/>);
    }
    else {
      return null;
    }
  },

  renderTitlePanel() {
    var i = this.props.savedActivities.get(this.props.activityIndex).get('main');
    var j = this.props.savedActivities.get(this.props.activityIndex).get('sub');
    return (
      <View style={styles.titleRow}>
        <Text style={styles.mainTitle}>{activities[i].get('key')}</Text>
        <Text style={styles.subtitle}>{activities[i].get('subActivities').get(j)}</Text>
      </View>
    );
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

    var titlePanel = this.renderTitlePanel();
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
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          {titlePanel}
          {actionPanel}
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.hemmoRow}>
            <Hemmo x={40} y={100}/>
          </View>
        </View>
        {speechBubble}
      </View>
    );
  }
});

export default ThumbVote;
