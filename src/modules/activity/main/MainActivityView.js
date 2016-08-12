import React, {PropTypes} from 'react';
import {Map, List} from 'immutable';
import * as UserState from '../../../modules/user/UserState';
import * as NavigationState from '../../../modules/navigation/NavigationState';
import SubActivityView from '../sub/SubActivityView';
import SpeechBubbleView from '../../../components/SpeechBubbleView';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {post} from '../../../utils/api';
import {getScreenWidth, getScreenHeight} from '../../../services/screenSize';
import {getSize, getImage} from '../../../services/graphics';

import {
  Image,
  Text,
  TouchableHighlight,
  Dimensions,
  View
} from 'react-native';

var styles = require('./mainStyles.js');
var activities = require('../activities.js');
var speechBubble;

const MainActivityView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    isReady: PropTypes.bool,
    savedActivities: PropTypes.instanceOf(List),
    activityIndex: PropTypes.number.isRequired,
    currentUser: PropTypes.instanceOf(Map)
  },

  getInitialState() {
    return {
      showBubble: true,
      showSubActivities: false,
      chosenMainActivity: Map()
    };
  },

  componentWillMount() {
    this.emptySelections();
  },

  emptySelections() {
    this.props.dispatch(UserState.saveAnswer(this.props.activityIndex, 'main', null));
    this.props.dispatch(UserState.saveAnswer(this.props.activityIndex, 'sub', null));
    this.props.dispatch(UserState.saveAnswer(this.props.activityIndex, 'thumb', null));
  },

  openSubActivities(activity) {
    this.saveAnswer(activity);
  },

  saveAnswer(activity) {
    var answer = activity.get('key');
    var question = 'Mita teitte';
    var type = 'text';

    post('/content', {contentType: type, answer, question})
      .then(result =>
        this.props.dispatch(
          UserState.saveAnswer(
            this.props.activityIndex,
            'main',
            activity.get('id'),
            result.contentId)
          )
      )
        .then(() => this.setState({showSubActivities: true, chosenMainActivity: activity, showBubble: true}));
  },

  closeSubActivities() {
    this.emptySelections();
    this.setState({showSubActivities: false});
  },

  other() {
    this.props.dispatch(NavigationState.pushRoute({key: 'Record', allowReturn: true}));
  },

  renderBubble(text, h, w, index) {
    if (this.state.showBubble === true) {
      return (<SpeechBubbleView
        text={text}
        bubbleType={'puhekupla_vasen2'}
        hideBubble={this.hideBubble}
        style={{top: h * 0.25, left: w * 0.5, margin: 20, fontSize: 12, size: 0.6}}
        maIndex={index}/>);
    }
    else {
      return null;
    }
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  render() {
    var activityWidth = Dimensions.get('window').width / 4;
    var h = getScreenHeight();
    var w = getScreenWidth();

    const activityViews = activities.map((activity) => (
      <TouchableHighlight
        style={styles.highlight}
        onPress={this.openSubActivities.bind(this, activity)}>
        <Image
          source={getImage('nelio')}
          key={activity.get('key')}
          style={[styles.activity, {width: null, height: null}]}>
          <Image
            style={[styles.activityImage, {width: activityWidth}]}
            source={activity.get('imageRoute')}/>
        </Image>
      </TouchableHighlight>
    ));

    if (this.state.showSubActivities === true) {
      var subActivities = (
        <SubActivityView
          chosenMainActivity={this.state.chosenMainActivity}
          dispatch={this.props.dispatch}
          closeSubActivities={this.closeSubActivities}
          activityIndex={this.props.activityIndex}/>
        );
      speechBubble = this.renderBubble('subActivity', h, w, this.state.chosenMainActivity.get('id'));
    }
    else {
      speechBubble = this.renderBubble('mainActivity', h, w);
    }

    if (!this.props.isReady) {
      return (
        <LoadingSpinner/>
      );
    }

    return (
      <Image source={getImage('tausta_perus2')} style={styles.container}>
        <View style={styles.row}>
          {activityViews[0]}
          {activityViews[1]}
          {activityViews[2]}
        </View>

        <View style={styles.row}>
          {activityViews[3]}
          <View style={styles.hemmo}>
            <Image source={getImage('hemmo_pieni')} style={getSize('hemmo_pieni', 0.4)}/>
            <Text onPress={this.other} style={styles.text}>Muuta</Text>
          </View>
          {activityViews[4]}
        </View>

        {subActivities}
        {speechBubble}
      </Image>
    );
  }
});

export default MainActivityView;
