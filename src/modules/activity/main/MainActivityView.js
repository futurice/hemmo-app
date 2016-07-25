import React, {PropTypes} from 'react';
import {Map, List} from 'immutable';
import * as UserState from '../../../modules/user/UserState';
import SubActivityView from '../sub/SubActivityView';
import SpeechBubbleView from '../../../components/SpeechBubbleView';
import {
  Image,
  TouchableHighlight,
  Dimensions,
  View
} from 'react-native';

var styles = require('./mainStyles.js');
var activities = require('../activities.js');
var activityWidth;
var speechBubble;

const MainActivityView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    savedActivities: PropTypes.instanceOf(List),
    activityIndex: PropTypes.number.isRequired
  },

  getInitialState() {
    return {
      showBubble: true,
      showSubActivities: false,
      chosenMainActivity: Map()
    };
  },

  componentWillMount() {
    activityWidth = Dimensions.get('window').width / 3 - 20;
  },

  openSubActivities(activity) {
    this.props.dispatch(UserState.saveAnswer(this.props.activityIndex, 'main', activity.get('id')));
    this.setState({showSubActivities: true, chosenMainActivity: activity, showBubble: true});
  },

  closeSubActivities() {
    this.setState({showSubActivities: false});
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  renderBubble(text, index) {
    if (this.state.showBubble === true) {
      return (<SpeechBubbleView
        text={text}
        hideBubble={this.hideBubble}
        position={{x: 15, y: 140, triangle: 150}}
        maIndex={index}/>);
    }
    else {
      return null;
    }
  },

  render() {

    const activityViews = activities.map((activity) => (
      <View key={activity.get('key')} style={styles.activity}>
        <TouchableHighlight
          style={styles.highlight}
          onPress={this.openSubActivities.bind(this, activity)}>
            <Image
              resizeMode={'contain'}
              style={[styles.activityImage, {width: activityWidth}]}
              source={activity.get('imageRoute')}/>
        </TouchableHighlight>
      </View>
    ));

    if (this.state.showSubActivities === true)
    {
      var subActivities = (
        <SubActivityView
          chosenMainActivity={this.state.chosenMainActivity}
          dispatch={this.props.dispatch}
          closeSubActivities={this.closeSubActivities}
          activityIndex={this.props.activityIndex}/>);

      speechBubble = this.renderBubble('subActivity', this.state.chosenMainActivity.get('id'));
    }
    else {
      speechBubble = this.renderBubble('mainActivity');
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          {activityViews[0]}
          {activityViews[1]}
          {activityViews[2]}
        </View>

        <View style={styles.row}>
          {activityViews[3]}
          <View style={styles.hemmo}>
            <Image resizeMode={'contain'}
              style={styles.hemmoImage}
              source={require('../../../../assets/Hemmo.jpg')}/>
          </View>
          {activityViews[4]}
        </View>

        {subActivities}
        {speechBubble}
      </View>
    );
  }
});

export default MainActivityView;
