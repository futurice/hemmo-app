import React, {PropTypes} from 'react';
import {Map, List} from 'immutable';
import * as UserState from '../../../modules/user/UserState';
import * as NavigationState from '../../../modules/navigation/NavigationState';
import SubActivityView from '../sub/SubActivityView';
import Hemmo from '../../../components/Hemmo';
import SpeechBubbleView from '../../../components/SpeechBubbleView';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {getScreenWidth, getScreenHeight} from '../../../services/screenSize';
import {getImage} from '../../../services/graphics';

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
    currentUser: PropTypes.instanceOf(Map)
  },

  getInitialState() {
    return {
      showBubble: true,
      showSubActivities: false,
      selectedMainActivity: Map()
    };
  },

  componentWillMount() {
    this.emptySelections();
  },

  emptySelections() {
    this.props.dispatch(UserState.saveAnswer(this.props.currentUser.get('activityIndex'), 'main', null));
    this.props.dispatch(UserState.saveAnswer(this.props.currentUser.get('activityIndex'), 'sub', null));
    this.props.dispatch(UserState.saveAnswer(this.props.currentUser.get('activityIndex'), 'thumb', null));
  },

  openSubActivities(activity) {
    this.saveAnswer(activity);
  },

  saveAnswer(activity) {
    this.props.dispatch(UserState.saveAnswer(this.props.currentUser.get('activityIndex'), 'main', activity.get('id')));
    this.setState({showSubActivities: true, selectedMainActivity: activity, showBubble: true});
  },

  closeSubActivities() {
    this.emptySelections();
    this.setState({showSubActivities: false});
  },

  other() {
    this.props.dispatch(NavigationState.pushRoute({key: 'Record', allowReturn: true}));
  },

  renderBubble(textKey, screenHeight, screenWidth, selected_ma) {
    if (this.state.showBubble === true) {
      return (<SpeechBubbleView
        text={textKey}
        bubbleType={'puhekupla_vasen2'}
        hideBubble={this.hideBubble}
        style={{top: screenHeight * 0.25, left: screenWidth * 0.5, margin: 20, fontSize: 12, size: 0.6}}
        maIndex={selected_ma}/>);
    }
    else {
      return null;
    }
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  restartAudioAndText() {
    this.setState({showBubble: true});
  },

  render() {
    var activityWidth = Dimensions.get('window').width / 4;
    var screenHeight = getScreenHeight();
    var screenWidth = getScreenWidth();

    const mainActivities = activities.map((activity) => (
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
          chosenMainActivity={this.state.selectedMainActivity}
          dispatch={this.props.dispatch}
          closeSubActivities={this.closeSubActivities}
          activityIndex={this.props.currentUser.get('activityIndex')}/>
        );
      speechBubble = this.renderBubble('subActivity', screenHeight, screenWidth, this.state.selectedMainActivity.get('id'));
    }
    else {
      speechBubble = this.renderBubble('mainActivity', screenHeight, screenWidth);
    }

    if (!this.props.isReady) {
      return (
        <LoadingSpinner/>
      );
    }

    return (
      <Image source={getImage('tausta_perus2')} style={styles.container}>
        <View style={styles.row}>
          {mainActivities[0]}
          {mainActivities[1]}
          {mainActivities[2]}
        </View>

        <View style={styles.row}>
          {mainActivities[3]}
          <View style={styles.hemmo}>
            <Hemmo image={'hemmo_pieni'} size={0.4} restartAudioAndText={this.restartAudioAndText}/>
            <Text onPress={this.other} style={styles.text}>Muuta</Text>
          </View>
          {mainActivities[4]}
        </View>

        {subActivities}
        {speechBubble}
      </Image>
    );
  }
});

export default MainActivityView;
