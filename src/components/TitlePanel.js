/*
Text panel that shows the selected main and sub activity on top of the recording panel
*/

import React, {PropTypes} from 'react';
import {List} from 'immutable';
import * as NavigationState from '../modules/navigation/NavigationState';
import {getSizeByHeight, getImage} from '../services/graphics';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

var activities = require('../data/activities.js');

const TitlePanel = React.createClass({

  propTypes: {
    savedActivities: PropTypes.instanceOf(List),
    activityIndex: PropTypes.number.isRequired,
    dispatch: PropTypes.func
  },

  cancel() {
    this.props.dispatch(NavigationState.popRoute());
  },

  render() {
    var i = this.props.savedActivities.get(this.props.activityIndex).get('main');
    var j = this.props.savedActivities.get(this.props.activityIndex).get('sub');

    if (i === null || j === null) {
      return null;
    }
    else {
      return (
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={this.cancel}>
            <Image
              source={getImage('nappula_takaisin')}
              style={[styles.backButton, getSizeByHeight('nappula_takaisin', 0.15)]}/>
          </TouchableOpacity>
          <View style={styles.titles}>
            <Text style={styles.mainTitle}>{activities[i].get('key')}</Text>
            <Text style={styles.subtitle}>{activities[i].get('subActivities').get(j).get('name')}</Text>
          </View>
        </View>
      );
    }
  }
});

const styles = StyleSheet.create({
  titleRow: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center'
  },
  titles: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'column'
  },
  mainTitle: {
    fontSize: 20,
    fontFamily: 'Gill Sans'
  },
  subTitle: {
    fontSize: 10,
    fontFamily: 'Gill Sans'
  },
  backButton: {
    margin: 10,
    marginLeft: 50
  }
});

export default TitlePanel;
