import React, {PropTypes} from 'react';
import {List} from 'immutable';
import * as ActivityState from '../../modules/activity/ActivityState';
import * as UserState from '../../modules/user/UserState';

import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableHighlight,
  Text
} from 'react-native';

var coordinates = [];

const SubActivityView = React.createClass({

  propTypes: {
    subActivities: PropTypes.instanceOf(List),
    dispatch: PropTypes.func.isRequired
  },
  componentWillMount() {
    this.countPositions();
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

    var fixValue = 0;

    var rows = 2;
    var perRow;

    for (var i = 0; i < rows; i++) {
      if (n % 2 === 0) {
        perRow = n / rows;
        if (i === 1) {
          fixValue = 20;
        }
        else {
          fixValue = 10;
        }
      }
      else {
        var topRow = ((n / rows) + 0.5);
        var bottomRow = ((n / rows) - 0.5);
        if (i === 0) {
          perRow = topRow;
          fixValue = 10;
        }
        else {
          perRow = bottomRow;
          fixValue = 20;
        }
      }
      var width = screenWidth / perRow;
      for (var j = 0; j < perRow; j++) {
        var x = j * width - fixValue;
        var y = i * height - fixValue;
        coordinates.push({x,y, width, height});
      }
    }
  },
  chooseActivity(subActivity, index) {
    this.props.dispatch(UserState.saveAnswer('SubActivity', index));
    Alert.alert('Valittiin ', 'Valittiin ' + subActivity + ' ' + index);
  },

  render() {

    const subActivityViews = this.props.subActivities.map((subActivity, index) => (
      <View
        key={subActivity}
        style={[styles.activityBlock, {
          left: coordinates[index].x,
          top: coordinates[index].y,
          width: coordinates[index].width,
          height: coordinates[index].height}]}>
          <TouchableHighlight
            style={{borderRadius: coordinates[index].height / 2}}
            onPress={this.chooseActivity.bind(this, subActivity, index)}>
            <View
              key={subActivity}
              style={[styles.activityCircle, {
                height: coordinates[index].height * 0.7,
                width: coordinates[index].height * 0.7,
                borderRadius: coordinates[index].height / 2}]}>
                  <Text style={styles.activityFont}>
                    {subActivity}
                  </Text>
            </View>
          </TouchableHighlight>
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
    // padding: 15,
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  activityBlock: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityCircle: {
    borderWidth: 2,
    justifyContent: 'center',
    //margin: 20,
    backgroundColor: 'white'
  },
  activityFont: {
    textAlign: 'center'
  }
});

export default SubActivityView;
