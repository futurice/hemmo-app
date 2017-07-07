import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import { saveAnswer } from '../../../modules/user/UserState';
import { NavigationActions } from 'react-navigation';
import { getScreenWidth, getScreenHeight } from '../../../services/screenSize';
import { getSizeByWidth, getImage } from '../../../services/graphics';
import SpeechBubble from '../../../components/SpeechBubble';
import LoadingSpinner from '../../../components/LoadingSpinner';
import TitlePanel from '../../../components/TitlePanel';
import Hemmo from '../../../components/Hemmo';
import {
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

const styles = require('./styles.js');
const activities = require('../../../data/activities.js');

const mapStateToProps = state => ({
  savedActivities: state.getIn(['user', 'currentUser', 'answers', 'activities']),
  activityIndex: state.getIn(['user', 'currentUser', 'activityIndex']),
  isReady: state.getIn(['session', 'isReady']),
  chosenMainActivity: activities[state.getIn(['user', 'currentUser', 'answers', 'activities',
    state.getIn(['user', 'currentUser', 'activityIndex']), 'main'])],
});

const mapDispatchToProps = dispatch => ({
  saveAnswer: (index, destination, answers) => dispatch(saveAnswer(index, destination, answers)),
  pushRoute: (key, phase) => dispatch(NavigationActions.navigate({ routeName: key, params: { phase } })),
  popRoute: () => dispatch(NavigationActions.back()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SubActivityView extends Component {

  static propTypes = {
    saveAnswer: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    popRoute: PropTypes.func.isRequired,
    isReady: PropTypes.bool.isRequired,
    savedActivities: PropTypes.instanceOf(List).isRequired,
    chosenMainActivity: PropTypes.instanceOf(Map),
    activityIndex: PropTypes.number.isRequired,
  };

  state = {
    showBubble: true,
  };

  // Resetting the navigation stack in Ending causes an
  // unnecessary update in some inactive, stacked components
  shouldComponentUpdate(nextProps) {
    return nextProps.activityIndex !== -1 && nextProps.chosenMainActivity !== undefined;
  }

  // Clears the main activity when the user navigates back
  componentWillUnmount() {
    this.props.saveAnswer(this.props.activityIndex, 'main', null);
  }

  chooseActivity = async (subActivity, subIndex) => {
    await this.props.saveAnswer(this.props.activityIndex, 'sub', subIndex);

    if (subActivity === 'Muuta') {
      this.props.pushRoute('Record', 'activities');
    }
    else {
      this.props.pushRoute('ThumbVote');
    }
  };

  hideBubble = () => {
    this.setState({ showBubble: false });
  };

  restartAudioAndText = () => {
    this.setState({ showBubble: true });
  };

  renderSubActivity = (subActivity, index, ratio) => (
    <TouchableHighlight
      key={subActivity.get('key')}
      style={[styles.activityBlock, { margin: 5, borderRadius: getSizeByWidth(subActivity.get('key'), ratio).height / 2 }]}
      onPress={() => this.chooseActivity(subActivity.get('name'), index)}
    >
      <Image
        source={getImage(subActivity.get('key'))}
        style={getSizeByWidth(subActivity.get('key'), ratio)}
      />
    </TouchableHighlight>
    );

  renderSubActivities = () => {
    const n = this.props.chosenMainActivity.get('subActivities').size;
    const ratio = n < 8 ? 0.20 : 0.15;
    const margin = n < 8 ? 10 : null;

    return (
      <View style={[styles.subActivities, { marginHorizontal: margin }]}>
        {this.props.chosenMainActivity.get('subActivities').map((subActivity, index) =>
          this.renderSubActivity(subActivity, index, ratio))}
      </View>
    );
  };

  renderHemmo = () => (
    <View style={styles.hemmo}>
      <Hemmo
        image={'hemmo_keski'}
        size={0.45}
        restartAudioAndText={this.restartAudioAndText}
      />
    </View>
    );

  renderActivityBar = () => (
    <View style={styles.activityBar}>
      {this.renderSubActivities()}
      {this.renderHemmo()}
    </View>
    );

  renderTitlePanel = () => (
    <TitlePanel
      activityIndex={this.props.activityIndex}
      savedActivities={this.props.savedActivities}
      popRoute={this.props.popRoute}
    />
    );

  renderBubble = () => this.state.showBubble ? (
    <SpeechBubble
      text={'subActivity'}
      bubbleType={'puhekupla_oikea'}
      hideBubble={this.hideBubble}
      style={{ top: getScreenHeight() * 0.25, left: getScreenWidth() * 0.25, margin: 40, fontSize: 14, size: 0.5 }}
      maIndex={this.props.chosenMainActivity.get('id')}
    />
    ) : null;

  render() {
    if (!this.props.isReady) {
      return (
        <LoadingSpinner />
      );
    }

    return (
      <View style={styles.container}>
        <Image
          source={getImage('tausta_levea')}
          style={[styles.subActivityContainer, getSizeByWidth('tausta_levea', 0.98)]}
        >
          {this.renderTitlePanel()}
          {this.renderActivityBar()}
          {this.renderBubble()}
        </Image>
      </View>
    );
  }
}
