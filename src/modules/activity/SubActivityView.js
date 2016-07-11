import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import * as ActivityState from '../../modules/activity/ActivityState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import * as UserState from '../../modules/user/UserState';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    chosenActivity: PropTypes.instanceOf(Map),
    dispatch: PropTypes.func.isRequired,
    currentViewIndex: PropTypes.number.isRequired
  },

  componentWillMount() {
    this.countPositions();
  },

  closeModal() {
    this.props.dispatch(ActivityState.closeSubActivities());
  },

  // TODO: Needs commenting etc.
  countPositions() {

    coordinates = [];
    var n = this.props.chosenActivity.get('subActivities').size;
    var screenWidth = Dimensions.get('window').width;
    var screenHeight = Dimensions.get('window').height - 20;

    var height = screenHeight / 2;

    var fixValue = 0;

    var rows = 2;
    var perRow;

    for (var i = 0; i < rows; i++) {
      if (n % 2 === 0) {
        perRow = n / rows;
      }
      else {
        var topRow = ((n / rows) + 0.5);
        var bottomRow = ((n / rows) - 0.5);
        perRow = (i === 1) ? bottomRow : topRow;
      }
      fixValue = (i === 1) ? 20 : 10;
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
    console.log('INDEX ' + this.props.currentViewIndex);
    this.props.dispatch(NavigationState.pushRoute({key: 'Feedback', index: this.props.currentViewIndex + 1}));
  },

  render() {
    const subActivityViews = this.props.chosenActivity.get('subActivities').map((subActivity, index) => (
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
        <View style={styles.titleBar}>
          <Text style={styles.title}>{this.props.chosenActivity.get('key')}</Text>
        </View>
        <View style={styles.activityBar}>
          {subActivityViews}
        </View>
        <Icon onPress={this.closeModal} name='times-circle' size={40} style={styles.closeButton}/>
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
  titleBar: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    fontSize: 20
  },
  activityBar: {
    position: 'absolute',
    top: 20,
    left: 5
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
  },
  closeButton: {
    color: 'green',
    position: 'absolute',
    top: 0,
    right: 5
  }
});

export default SubActivityView;
