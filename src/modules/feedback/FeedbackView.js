import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import Hemmo from '../../components/Hemmo';
import WritingView from './WritingView';
import * as FeedbackState from '../../modules/feedback/FeedbackState';

import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var styles = require('./styles.js');
var activities = require('../activity/activities.js');

const FeedbackView = React.createClass({

  propTypes: {
    answers: PropTypes.instanceOf(Map),
    enableWriting: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },

  enableWriting() {
    this.props.dispatch(FeedbackState.enableWriting());
  },

  render() {

    var i = this.props.answers.get('MainActivity');
    var j = this.props.answers.get('SubActivity');

    if (this.props.enableWriting === true)
    {
      var writing = <WritingView dispatch={this.props.dispatch}/>;
    }

    return (
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <View style={styles.titleRow}>
            <Text style={styles.mainTitle}>{activities[i].get('key')}</Text>
            <Text style={styles.subtitle}>{activities[i].get('subActivities').get(j)}</Text>
          </View>

          <View style={styles.actionRow}>
            <Text>Action</Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.hemmoRow}>
            <Hemmo x={40} y={40}/>
          </View>
          <View style={styles.extraRow}>
            <View style={styles.writeButton}>
              <TouchableHighlight
                onPress={this.enableWriting}>
                <Text style={styles.text}>
                  Kirjoita
                </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.skipButton}>
              <TouchableHighlight>
                <Text style={styles.text}>
                  Ohita
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>

        {writing}

      </View>
    );
  }
});

export default FeedbackView;
