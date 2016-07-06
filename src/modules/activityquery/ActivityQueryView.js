import React, {PropTypes} from 'react';

import {
  Text,
  Image,
  View
} from 'react-native';
var styles = require('./styles.js');

const ActivityQueryView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired
  },
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.activity}>
            <Image resizeMode={'contain'}
              style={styles.activityImage}
              source={require('../../../assets/Puuhailu.jpg')}/>
          </View>
          <View style={styles.activity}>
            <Image resizeMode={'contain'}
              style={styles.activityImage}
              source={require('../../../assets/Ulkoilu.jpg')}/>
          </View>
          <View style={styles.activity}>
            <Image resizeMode={'contain'}
              style={styles.activityImage}
              source={require('../../../assets/Leikkiminen.jpg')}/>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.activity}>
            <Image resizeMode={'contain'}
              style={styles.activityImage}
              source={require('../../../assets/Yhdessa.jpg')}/>
          </View>
          <View style={styles.hemmo}>
            <Image resizeMode={'contain'}
              style={styles.activityImage}
              source={require('../../../assets/Hemmo.jpg')}/>
          </View>
          <View style={styles.activity}>
            <Image resizeMode={'contain'}
              style={styles.activityImage}
              source={require('../../../assets/Lemmikit.jpg')}/>
          </View>
        </View>
      </View>
    );
  }
});


export default ActivityQueryView;
