import React, {PropTypes} from 'react';
import {List} from 'immutable';
import * as ActivityState from '../../modules/activity/ActivityState';

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Text
} from 'react-native';

var coordinates = [];

const SubActivityView = React.createClass({

  propTypes: {
    subActivities: PropTypes.instanceOf(List),
    dispatch: PropTypes.func.isRequired
  },
  closeModal() {
    this.props.dispatch(ActivityState.closeSubActivities());
  },
  countPositions() {
    coordinates = [];
    var n = this.props.subActivities.size;
    var screenWidth = Dimensions.get('window').width;
    var screenHeight = Dimensions.get('window').height;
    var height = screenHeight / 2;
    var rows = 2;
    var perRow;

    for (var i = 0; i < rows; i++) {
      if (n % 2 === 0) {
        perRow = n / rows;
      }
      else {
        var topRow = ((n / rows) + 0.5);
        var bottomTop = ((n / rows) - 0.5);
        if (i === 0) {
          perRow = topRow;
        }
        else {
          perRow = bottomTop;
        }
      }
      var width = screenWidth / perRow;
      for (var j = 0; j < perRow; j++) {
        var x = j * width;
        var y = i * height;
        coordinates.push({x,y, width, height});
      }
    }
  },

  render() {
    this.countPositions();

    const subActivityViews = this.props.subActivities.map((subActivity, index) => (
      <View
        key={subActivity}
        style={[styles.activityBlock, {
          left: coordinates[index].x,
          top: coordinates[index].y,
          width: coordinates[index].width,
          height: coordinates[index].height}]}>
        <View key={subActivity} style={[styles.activityCircle]}>
          <TouchableHighlight>
              <Text style={styles.activityFont}>
                {subActivity}
              </Text>
          </TouchableHighlight>
      </View>
      </View>
    ));

    return (
      <View style={styles.container}>
        {subActivityViews}
        <Text onPress={this.closeModal}> SULJE </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(233, 233, 233, 0.93)',
    borderWidth: 2,
    borderRadius: 20,
    padding: 15,
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  activityBlock: {
    position: 'absolute',
    alignItems: 'center'
  },
  activityCircle: {
    borderWidth: 2,
    borderRadius: 70,
    justifyContent: 'center',
    margin: 20,
    width: 130,
    height: 130,
    backgroundColor: 'white'
  },
  activityFont: {
    textAlign: 'center'
  }
});

export default SubActivityView;
