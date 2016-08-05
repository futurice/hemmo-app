import React, {PropTypes} from 'react';
import {List} from 'immutable';
import * as NavigationState from '../modules/navigation/NavigationState';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

var activities = require('../modules/activity/activities.js');
var graphics = require('./graphics.js');

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
      console.log('ei otsikoita');
      return null;
    }
    else {
      return (
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={this.cancel}>
            <Image source={graphics.get('nappula_takaisin')} style={styles.backButton}/>
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
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 10
  },
  backButton: {
    margin: 30,
    height: 40,
    width: 25
  }
});

export default TitlePanel;
