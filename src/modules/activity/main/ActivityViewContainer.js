import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveAnswer } from '../../../modules/user/UserState';
import { NavigationActions } from 'react-navigation';
import Hemmo from '../../../components/Hemmo';
import SpeechBubble from '../../../components/SpeechBubble';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { getScreenWidth, getScreenHeight } from '../../../services/screenSize';
import { getImage, getSizeByWidth } from '../../../services/graphics';
import {
  Image,
  TouchableHighlight,
  View,
} from 'react-native';

const styles = require('./styles.js');
const activities = require('../../../data/activities.js');

const mapStateToProps = state => ({
  activityIndex: state.getIn(['user', 'currentUser', 'activityIndex']),
  isReady: state.getIn(['session', 'isReady']),
});

const mapDispatchToProps = dispatch => ({
  saveAnswer: (index, destination, answers) => dispatch(saveAnswer(index, destination, answers)),
  pushRoute: (key, phase) => dispatch(NavigationActions.navigate({ routeName: key, params: { phase } })),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ActivityViewContainer extends Component {

  static propTypes = {
    saveAnswer: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    isReady: PropTypes.bool.isRequired,
    activityIndex: PropTypes.number.isRequired,
  };

  state = {
    showBubble: true,
  };

  componentWillMount() {
    this.props.saveAnswer(this.props.activityIndex, 'main', null);
    this.props.saveAnswer(this.props.activityIndex, 'sub', null);
    this.props.saveAnswer(this.props.activityIndex, 'thumb', null);
  }

  chooseMainActivity = async (activity) => {
    await this.props.saveAnswer(this.props.activityIndex, 'main', activity.get('id'));
    this.props.pushRoute('SubActivity');
  };

  hideBubble = () => {
    this.setState({ showBubble: false });
  };

  restartAudioAndText = () => {
    this.setState({ showBubble: true });
  };

  renderBubble = () => this.state.showBubble ? (
    <SpeechBubble
      text={'mainActivity'}
      bubbleType={'puhekupla_vasen2'}
      hideBubble={this.hideBubble}
      style={{
        top: getScreenHeight() * 0.22,
        left: getScreenWidth() * 0.55,
        margin: 20,
        fontSize: 12,
        size: 0.6,
      }}
    />
  ) : null;

  renderOtherActivity = () => (
    <View style={styles.other}>
      <TouchableHighlight
        onPress={() => this.props.pushRoute('Record', 'activities')}
        style={[getSizeByWidth('muuta', 0.1),
            { borderRadius: getSizeByWidth('muuta', 0.1).width / 2 }]}
      >
        <Image source={getImage('muuta')} style={[getSizeByWidth('muuta', 0.1)]} />
      </TouchableHighlight>
    </View>
    );

  renderHemmo = () => (
    <View style={styles.hemmo}>
      <Hemmo
        image={'hemmo_pieni'}
        size={0.4}
        restartAudioAndText={this.restartAudioAndText}
      />
    </View>
    );

  renderMainActivity = activity => (
    <TouchableHighlight
      style={[styles.highlight, getSizeByWidth('nelio', 0.3)]}
      onPress={() => this.chooseMainActivity(activity)}
    >
      <Image
        style={[styles.activityImage, getSizeByWidth('nelio', 0.3)]}
        source={activity.get('imageRoute')}
      />
    </TouchableHighlight>
    );

  renderMainActivities = () => activities.map(activity => this.renderMainActivity(activity));

  render() {
    if (!this.props.isReady) {
      return (
        <LoadingSpinner />
      );
    }

    const mainActivities = this.renderMainActivities();

    return (
      <Image source={getImage('tausta_perus2')} style={styles.container}>
        <View style={styles.row}>
          {mainActivities[0]}
          {mainActivities[1]}
          {mainActivities[2]}
        </View>
        <View style={styles.row}>
          {mainActivities[3]}
          {this.renderHemmo()}
          {this.renderOtherActivity()}
          {mainActivities[4]}
        </View>
        {this.renderBubble()}
      </Image>
    );
  }
}
