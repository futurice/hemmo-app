import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import Hemmo from '../../components/Hemmo';
import WritingView from './WritingView';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as UserState from '../../modules/user/UserState';
import * as NavigationState from '../../modules/navigation/NavigationState';

import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var styles = require('./styles.js');
var activities = require('../activity/activities.js');
var icons = [{icon: 'thumbs-down'}, {icon: 'meh-o'}, {icon: 'thumbs-up'}];
var actionPanel;

const FeedbackView = React.createClass({

  propTypes: {
    answers: PropTypes.instanceOf(Map),
    dispatch: PropTypes.func.isRequired,
    navigationState: PropTypes.object
  },

  getInitialState() {
    return {
      enableWriting: false
    };
  },

  enableWriting() {
    this.setState({enableWriting: true});
  },

  disableWriting() {
    this.setState({enableWriting: false});
  },

  vote(vote) {
    this.props.dispatch(UserState.saveAnswer('Thumb', vote));
    var layout = Map({
      showTitle: true,
      voteThumbs: false});
    this.props.dispatch(NavigationState.pushRoute({key: 'Feedback', pageLayout: layout}));
  },

  render() {
    var i = this.props.answers.get('MainActivity');
    var j = this.props.answers.get('SubActivity');

    var index = this.props.navigationState.index;
    var pageLayout = this.props.navigationState.children[index].pageLayout;

    // Check if the view is related to selected activities. If not
    // and the user is giving feedback regarding something else, the activity title is not displayed
    if (pageLayout.showTitle === true) {
      var titlePanel = (
        <View style={styles.titleRow}>
          <Text style={styles.mainTitle}>{activities[i].get('key')}</Text>
          <Text style={styles.subtitle}>{activities[i].get('subActivities').get(j)}</Text>
        </View>);
    }

    if (pageLayout.voteThumbs === true) {
      var thumbs = [];
      for (i = 0; i <= 2; i++) {
        thumbs.push(
          <View key={i}>
            <Icon
              onPress={this.vote.bind(this, i)}
              name={icons[i].icon}
              size={100}
              style={styles.voteButton}/>
          </View>
        );
      }
      actionPanel = (
        <View style={styles.actionRow}>
          {thumbs}
        </View>
      );
    }
    else {
      actionPanel = (
        <View style={styles.actionRow}>
          <Text>Recording voice</Text>
        </View>
      );

      var icon = 'pencil';
      var text = 'Kirjoita';
      // Check if the writing view should be displayed
      if (this.state.enableWriting === true) {
        var writingView = <WritingView disableWriting={this.disableWriting}/>;
        icon = 'save';
        text = 'Tallenna';
      }

      var writeOrSkipPanel = (
        <View style={styles.extraRow}>
          <View style={styles.writeButton}>
            <TouchableHighlight
              onPress={this.enableWriting}
              style={styles.writeButtonHighlight}>
              <View style={styles.button}>
                <Text style={styles.text}>
                  {text}
                </Text>
                <Icon size={20} name={icon}/>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.skipButton}>
            <TouchableHighlight style={styles.skipButtonHighlight}>
              <View style={styles.button}>
                <Text style={styles.text}>
                  Ohita
                </Text>
                <Icon size={20} name={'angle-right'}/>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          {titlePanel}
          {actionPanel}
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.hemmoRow}>
            <Hemmo x={40} y={40}/>
          </View>
          {writeOrSkipPanel}
        </View>
        {writingView}
      </View>
    );
  }
});

export default FeedbackView;
