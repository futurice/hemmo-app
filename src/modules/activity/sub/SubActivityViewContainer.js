import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import {saveAnswer} from '../../../modules/user/UserState';
import {pushRoute, popRoute} from '../../../modules/navigation/NavigationState';
import {getScreenWidth, getScreenHeight} from '../../../services/screenSize';
import {getSizeByWidth, getImage} from '../../../services/graphics';
import SpeechBubble from '../../../components/SpeechBubble';
import LoadingSpinner from '../../../components/LoadingSpinner';
import TitlePanel from '../../../components/TitlePanel';
import Hemmo from '../../../components/Hemmo';
import {
  View,
  Image,
  TouchableHighlight
} from 'react-native';

let styles = require('./styles.js');
let activities = require('../../../data/activities.js');

const mapStateToProps = state => ({
  savedActivities: state.getIn(['user', 'currentUser', 'answers', 'activities']),
  activityIndex: state.getIn(['user', 'currentUser', 'activityIndex']),
  currentUser: state.getIn(['user', 'currentUser']),
  isReady: state.getIn(['session', 'isReady']),
  chosenMainActivity: activities[state.getIn(['user', 'currentUser', 'answers', 'activities',
    state.getIn(['user', 'currentUser', 'activityIndex']), 'main'])]
});

const mapDispatchToProps = dispatch => ({
  saveAnswer: (index, destination, answers) => dispatch(saveAnswer(index, destination, answers)),
  pushRoute: (key) => dispatch(pushRoute(key)),
  popRoute: () => dispatch(popRoute())
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SubActivityView extends Component {

  static propTypes = {
    saveAnswer: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    popRoute: PropTypes.func.isRequired,
    isReady: PropTypes.bool,
    savedActivities: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map),
    chosenMainActivity: PropTypes.instanceOf(Map),
    activityIndex: PropTypes.number.isRequired
  };

  state = {
    showBubble: true
  };

  componentWillMount() {
    this.props.saveAnswer(this.props.currentUser.get('activityIndex'), 'sub', null);
    this.props.saveAnswer(this.props.currentUser.get('activityIndex'), 'thumb', null);
  }

  chooseActivity = (subActivity, subIndex) => {
    this.props.saveAnswer(this.props.activityIndex, 'sub', subIndex);
    this.props.pushRoute({key: subActivity === 'Muuta' ? 'Record' : 'Thumbs', allowReturn: true});
  };

  hideBubble = () => {
    this.setState({showBubble: false});
  };

  restartAudioAndText = () => {
    this.setState({showBubble: true});
  };

  renderSubActivity = (subActivity, index, ratio) => {
    return (
      <TouchableHighlight
        key={subActivity.get('key')}
        style={[styles.activityBlock, {margin: 5, borderRadius: getSizeByWidth(subActivity.get('key'), ratio).height / 2}]}
        onPress={() => this.chooseActivity(subActivity.get('name'), index)}>
        <Image
          source={getImage(subActivity.get('key'))}
          style={getSizeByWidth(subActivity.get('key'), ratio)}/>
      </TouchableHighlight>
    );
  };

  renderSubActivities = () => {
    let n = this.props.chosenMainActivity.get('subActivities').size;
    let ratio = n < 8 ? 0.20 : 0.15;
    let margin = n < 8 ? 10 : null;

    return (
      <View style={[styles.subActivities, {marginHorizontal: margin}]}>
        {this.props.chosenMainActivity.get('subActivities').map((subActivity, index) =>
          this.renderSubActivity(subActivity, index, ratio))}
      </View>
    );
  };

  renderHemmo = () => {
    return (
      <View style={styles.hemmo}>
        <Hemmo
          image={'hemmo_keski'}
          size={0.45}
          restartAudioAndText={this.restartAudioAndText}
        />
      </View>
    );
  };

  renderActivityBar = () => {
    return (
      <View style={styles.activityBar}>
        {this.renderSubActivities()}
        {this.renderHemmo()}
      </View>
    );
  };

  renderTitlePanel = () => {
    return (
      <TitlePanel
        activityIndex={this.props.activityIndex}
        savedActivities={this.props.savedActivities}
        popRoute={this.props.popRoute}
      />
    );
  };

  renderBubble = () => {
    return this.state.showBubble ? (
      <SpeechBubble
        text={'subActivity'}
        bubbleType={'puhekupla_oikea'}
        hideBubble={this.hideBubble}
        style={{top: getScreenHeight() * 0.25, left: getScreenWidth() * 0.25, margin: 40, fontSize: 14, size: 0.5}}
        maIndex={this.props.chosenMainActivity.get('id')}
      />
    ) : null;
  };

  render() {
    if (!this.props.isReady) {
      return (
        <LoadingSpinner/>
      );
    }

    return (
      <View style={styles.container}>
        <Image
          source={getImage('tausta_levea')}
          style={[styles.subActivityContainer, getSizeByWidth('tausta_levea', 0.98)]}>
          {this.renderTitlePanel()}
          {this.renderActivityBar()}
          {this.renderBubble()}
        </Image>
      </View>
    );
  }
}