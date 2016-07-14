import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import * as NavigationState from '../../modules/navigation/NavigationState';
import * as UserState from '../../modules/user/UserState';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  Dimensions,
  TouchableHighlight,
  Text
} from 'react-native';

var coordinates = [];
var styles = require('./subStyles.js');

const SubActivityView = React.createClass({

  propTypes: {
    chosenMainActivity: PropTypes.instanceOf(Map),
    dispatch: PropTypes.func.isRequired,
    closeSubActivities: PropTypes.func.isRequired
  },

  componentWillMount() {
    this.countPositions();
  },

  closeSubActivities() {
    this.props.closeSubActivities();
  },

  // TODO: Needs commenting etc.
  countPositions() {

    coordinates = [];
    var n = this.props.chosenMainActivity.get('subActivities').size;
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
    var layout = Map({
      showTitle: true,
      voteThumbs: true});
    this.props.dispatch(NavigationState.pushRoute({key: 'Feedback', pageLayout: layout}));
  },

  render() {

    const subActivityViews = this.props.chosenMainActivity.get('subActivities').map((subActivity, index) => (
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
          <Text style={styles.title}>{this.props.chosenMainActivity.get('key')}</Text>
        </View>
        <View style={styles.activityBar}>
          {subActivityViews}
        </View>
        <Icon onPress={this.closeModal} name='times-circle' size={40} style={styles.closeButton}/>
      </View>
    );
  }
});

export default SubActivityView;
