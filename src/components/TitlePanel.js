import React, {PropTypes} from 'react';
import {List} from 'immutable';
import * as NavigationState from '../modules/navigation/NavigationState';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    var i = this.props.savedActivities.get(this.props.activityIndex).get('main');
    var j = this.props.savedActivities.get(this.props.activityIndex).get('sub');

    if (i === null || j === null) {
      console.log('ei otsikoita');
      return null;
    }
    else {
      return (
        <View style={styles.titleRow}>
          <Icon onPress={this.cancel} size={30} name={'angle-left'} style={{flex: 1, marginLeft: 30}}/>
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
  }
});

export default TitlePanel;
