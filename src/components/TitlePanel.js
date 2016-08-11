import React, {PropTypes} from 'react';
import {List} from 'immutable';
import * as NavigationState from '../modules/navigation/NavigationState';
import {getSize, getImage} from '../services/graphics';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

var activities = require('../modules/activity/activities.js');

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
    var i = this.props.savedActivities.get(this.props.activityIndex).get('main').get('content');
    var j = this.props.savedActivities.get(this.props.activityIndex).get('sub').get('content');

    if (i === null || j === null) {
      return null;
    }
    else {
      return (
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={this.cancel}>
            <Image
              source={getImage('nappula_takaisin')}
              style={[styles.backButton, getSize('nappula_takaisin', 0.15)]}/>
          </TouchableOpacity>
          <View style={styles.titles}>
            <Text style={styles.mainTitle}>{activities[i].get('key')}</Text>
            <Text style={styles.subtitle}>{activities[i].get('subActivities').get(j)}</Text>
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
    textAlign: 'center',
    fontFamily: 'Gill Sans'
  },
  subTitle: {
    fontSize: 10,
    fontFamily: 'Gill Sans'
  },
  backButton: {
    margin: 30
  }
});

export default TitlePanel;
