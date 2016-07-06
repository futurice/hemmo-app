import React, {PropTypes} from 'react';
import {Map, List} from 'immutable';

import {
  Image,
  View
} from 'react-native';
var styles = require('./styles.js');

//TODO: Can paths be formed dynamically? This is ugly and inconvinient
var activities = List([
  Map({key: 'Puuhailu', route: require('../../../assets/Puuhailu.jpg'), id: 0}),
  Map({key: 'Ulkoilu', route: require('../../../assets/Puuhailu.jpg'), id: 1}),
  Map({key: 'Leikkiminen', route: require('../../../assets/Puuhailu.jpg'), id: 2}),
  Map({key: 'Yhdessa', route: require('../../../assets/Puuhailu.jpg'), id: 3}),
  Map({key: 'Lemmikit', route: require('../../../assets/Puuhailu.jpg'), id: 4})]);

const ActivityQueryView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired
  },
  render() {
    const activityViews = activities.map((activity) => (
      <View key={activity.get('key')} style={styles.activity}>
        <Image
          resizeMode={'contain'}
          style={styles.activityImage}
          source={activity.get('route')}/>
      </View>
    ));

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          {activityViews.get(0)}
          {activityViews.get(1)}
          {activityViews.get(2)}
        </View>

        <View style={styles.row}>
          {activityViews.get(3)}
          <View style={styles.hemmo}>
            <Image resizeMode={'contain'}
              style={styles.activityImage}
              source={require('../../../assets/Hemmo.jpg')}/>
          </View>
          {activityViews.get(4)}
        </View>
      </View>
    );
  }
});


export default ActivityQueryView;
