import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import { saveAnswer } from '../../../modules/user/UserState';
import Hemmo from '../../../components/Hemmo';
import SpeechBubble from '../../../components/SpeechBubble';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { getScreenWidth, getScreenHeight } from '../../../services/screenSize';
import { getImage, getSizeByWidth } from '../../../services/graphics';
import {
  Image,
  TouchableHighlight,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  subActivityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

const activities = require('../../../data/activities.js');

const mapStateToProps = state => ({
  activityIndex: state.getIn(['user', 'currentUser', 'activityIndex']),
  isReady: state.getIn(['session', 'isReady']),
});

const mapDispatchToProps = dispatch => ({
  saveAnswer: (index, destination, answers) => dispatch(saveAnswer(index, destination, answers)),
  pushRoute: key => dispatch(NavigationActions.navigate({ routeName: key })),
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
    chosenMainActivity: null,
  };

  chooseMainActivity = async (activity) => {
    await this.props.saveAnswer(this.props.activityIndex, 'main', activity.get('id'));

    this.setState({ chosenMainActivity: this.state.chosenMainActivity
    && this.state.chosenMainActivity.get('id') === activity.get('id') ? null : activity });
  };

  chooseSubActivity = async (subActivity) => {
    await this.props.saveAnswer(this.props.activityIndex, 'sub', subActivity.get('id'));
    this.props.pushRoute('ThumbVote');
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

  renderHemmo = () => (
    <View style={styles.hemmo}>
      <Hemmo
        image={'hemmo_pieni'}
        size={0.4}
        restartAudioAndText={this.restartAudioAndText}
      />
    </View>
    );

  renderSubActivity = (subActivity, index) => (
    <TouchableHighlight
      key={index}
      style={{ margin: 5, borderRadius: getSizeByWidth(subActivity.get('key'), 0.15).height / 2 }}
      onPress={() => this.chooseSubActivity(subActivity)}
    >
      <Image
        source={getImage(subActivity.get('key'))}
        style={getSizeByWidth(subActivity.get('key'), 0.20)}
      />
    </TouchableHighlight>
    );

  renderSubActivities = mainActivity => (
    <View style={styles.subActivityContainer}>
      {mainActivity.get('subActivities').map((subActivity, index) =>
        this.renderSubActivity(subActivity, index))}
    </View>
  );

  renderMainActivity = (mainActivity, index) => (
    <TouchableHighlight
      key={index}
      style={[{ margin: 5, alignSelf: 'center' }, getSizeByWidth('nelio', 0.3)]}
      onPress={() => this.chooseMainActivity(mainActivity)}
    >
      <Image
        style={getSizeByWidth('nelio', 0.3)}
        source={mainActivity.get('imageRoute')}
      />
    </TouchableHighlight>
    );

  renderMainActivities = () => (
    <ScrollView>
      <Accordion
        sections={activities}
        activeSection={this.state.chosenMainActivity ? this.state.chosenMainActivity.get('id') : false}
        renderHeader={this.renderMainActivity}
        renderContent={this.renderSubActivities}
        underlayColor={'white'}
      />
    </ScrollView>
    );

  render() {
    if (!this.props.isReady) {
      return (
        <LoadingSpinner />
      );
    }

    return (
      <View style={styles.container}>
        {this.renderMainActivities()}
        {/*{this.renderBubble()}*/}
      </View>
    );
  }
}
