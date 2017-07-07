import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import TitlePanel from '../../../components/TitlePanel';
import Hemmo from '../../../components/Hemmo';
import { NavigationActions } from 'react-navigation';
import { saveAnswer } from '../../user/UserState';
import SpeechBubble from '../../../components/SpeechBubble';
import { getSizeByHeight, getSizeByWidth, getImage } from '../../../services/graphics';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

const styles = require('./styles.js');

const thumbs = [
  { value: 1, imageName: 'peukku_ylos_0' },
  { value: 0, imageName: 'peukku_keski_0' },
  { value: -1, imageName: 'peukku_alas_0' },
];

const mapStateToProps = state => ({
  savedActivities: state.getIn(['user', 'currentUser', 'answers', 'activities']),
  activityIndex: state.getIn(['user', 'currentUser', 'activityIndex']),
  mainActivityIndex: state.getIn(['user', 'currentUser', 'answers', 'activities',
    state.getIn(['user', 'currentUser', 'activityIndex']), 'main']),
  subActivityIndex: state.getIn(['user', 'currentUser', 'answers', 'activities',
    state.getIn(['user', 'currentUser', 'activityIndex']), 'sub']),
});

const mapDispatchToProps = dispatch => ({
  saveAnswer: (index, destination, answers) => dispatch(saveAnswer(index, destination, answers)),
  pushRoute: (key, phase) => dispatch(NavigationActions.navigate({ routeName: key, params: { phase } })),
  popRoute: () => dispatch(NavigationActions.back()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ThumbVoteViewContainer extends Component {

  static propTypes = {
    saveAnswer: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    popRoute: PropTypes.func.isRequired,
    savedActivities: PropTypes.instanceOf(List).isRequired,
    activityIndex: PropTypes.number.isRequired,
    mainActivityIndex: PropTypes.number,
    subActivityIndex: PropTypes.number,
  };

  state = {
    showBubble: true,
  };

  // Resetting the navigation stack in Ending causes an
  // unnecessary update in some inactive, stacked components
  shouldComponentUpdate(nextProps) {
    return nextProps.activityIndex !== -1 && nextProps.mainActivityIndex !== null && nextProps.subActivityIndex !== null;
  }

  // Clears the subactivity when the user navigates back
  componentWillUnmount() {
    this.props.saveAnswer(this.props.activityIndex, 'sub', null);
  }

  vote = async (vote) => {
    await this.props.saveAnswer(this.props.activityIndex, 'thumb', vote);
    this.props.pushRoute('Record', 'activities');
  };

  hideBubble = () => {
    this.setState({ showBubble: false });
  };

  restartAudioAndText = () => {
    this.setState({ showBubble: true });
  };

  renderBubble = (text, i, j) => this.state.showBubble ? (
    <SpeechBubble
      text={text}
      hideBubble={this.hideBubble}
      bubbleType={'puhekupla_oikea'}
      style={{ top: 100, right: 250, margin: 15, fontSize: 17, size: 0.4 }}
      maIndex={i}
      saIndex={j}
    />
    ) : null;

  renderThumbButton = (thumb, i) => (
    <View key={i}>
      <TouchableOpacity onPress={() => this.vote(thumb.value)}>
        <Image
          source={getImage(thumb.imageName)}
          style={[styles.voteButton, getSizeByHeight(thumb.imageName, 0.25)]}
        />
      </TouchableOpacity>
    </View>
    );

  renderThumbButtons = () => thumbs.map((thumb, i) => this.renderThumbButton(thumb, i));

  renderTitlePanel = () => (
    <TitlePanel
      activityIndex={this.props.activityIndex}
      savedActivities={this.props.savedActivities}
      popRoute={this.props.popRoute}
    />
    );

  renderActionPanel = () => (
    <View style={styles.actionRow}>
      {this.renderThumbButtons()}
    </View>
    );

  renderLeftColumn = () => (
    <Image
      source={getImage('tausta_kapea')}
      style={[styles.leftColumn, getSizeByWidth('tausta_kapea', 0.6)]}
    >
      {this.renderTitlePanel()}
      {this.renderActionPanel()}
    </Image>
    );

  renderRightColumn = () => (
    <View style={styles.rightColumn}>
      <Hemmo
        image={'hemmo_keski'}
        size={0.7}
        restartAudioAndText={this.restartAudioAndText}
      />
    </View>
    );

  render() {
    return (
      <Image source={getImage('tausta_perus')} style={styles.container}>
        {this.renderLeftColumn()}
        {this.renderRightColumn()}
        {this.renderBubble('subActivity', this.props.mainActivityIndex, this.props.subActivityIndex)}
      </Image>
    );
  }
}
