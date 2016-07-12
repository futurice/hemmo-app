import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import Hemmo from '../../components/Hemmo';
import WritingView from './WritingView';

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
    dispatch: PropTypes.func.isRequired,
    showTitle: PropTypes.bool
  },

  getInitialState() {
    return {
      enableWri: false
    };
  },

  enableWriting() {
    this.setState({enableWri: true});
  },

  disableWriting() {
    this.setState({enableWri: false});
  },

  render() {

    var i = this.props.answers.get('MainActivity');
    var j = this.props.answers.get('SubActivity');

    if (this.state.enableWri === true) {
      var writing = <WritingView dispatch={this.props.dispatch} disableWriting={this.disableWriting}/>;
    }

    if (this.props.showTitle === true) {
      var title = <View style={styles.titleRow}>
          <Text style={styles.mainTitle}>{activities[i].get('key')}</Text>
          <Text style={styles.subtitle}>{activities[i].get('subActivities').get(j)}</Text>
        </View>;
    }

    return (
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          {title}

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
