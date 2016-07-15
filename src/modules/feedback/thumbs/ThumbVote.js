import React, {PropTypes} from 'react';
import {Map, List} from 'immutable';
import Hemmo from '../../../components/Hemmo';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as UserState from '../../../modules/user/UserState';
import * as NavigationState from '../../../modules/navigation/NavigationState';

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

  vote(vote) {
    console.log('VOTE INDEX ' + this.props.activityIndex);
    this.props.dispatch(UserState.saveAnswer(this.props.activityIndex, 'thumb', vote));
    this.props.dispatch(NavigationState.pushRoute({key: 'Record'}));
  },

  renderTitlePanel() {
    console.log('VOTE INDEX ' + this.props.activityIndex);

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

    return (
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          {titlePanel}
          {actionPanel}
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.hemmoRow}>
            <Hemmo x={40} y={40}/>
          </View>
        </View>
      </View>
    );
  }
});

export default ThumbVote;
