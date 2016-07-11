import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import Hemmo from '../../components/Hemmo';

import {
  Text,
  View
} from 'react-native';

var styles = require('./styles.js');
var activities = require('../activity/activities.js');

const FeedbackView = React.createClass({

  propTypes: {
    answers: PropTypes.instanceOf(Map)
  },

  render() {

    var i = this.props.answers.get('MainActivity');
    var j = this.props.answers.get('SubActivity');

    return (
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <View style={styles.titleRow}>
            <Text style={styles.mainTitle}>{activities[i].get('key')}</Text>
            <Text style={styles.subtitle}>{activities[i].get('subActivities').get(j)}</Text>
            // TODO: Add pictures
          </View>

          <View style={styles.actionRow}>
            <Text>Action</Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.hemmoRow}>
            <Hemmo x={40} y={40}/>
          </View>
          // TODO: Hide when writing option is not available
          <View style={styles.extraRow}>
            <Text>Extra</Text>
          </View>
        </View>
      </View>
    );
  }
});

export default FeedbackView;
