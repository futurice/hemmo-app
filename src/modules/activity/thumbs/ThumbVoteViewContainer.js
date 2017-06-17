import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';
import TitlePanel from '../../../components/TitlePanel';
import Hemmo from '../../../components/Hemmo';
import {pushRoute, popRoute} from '../../navigation/NavigationState';
import {saveAnswer} from '../../user/UserState';
import SpeechBubble from '../../../components/SpeechBubble';
import {getSizeByHeight, getSizeByWidth, getImage} from '../../../services/graphics';
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';

let styles = require('./styles.js');
let thumbs = [
  {value: 1, imageName: 'peukku_ylos_0'},
  {value: 0, imageName: 'peukku_keski_0'},
  {value: -1, imageName: 'peukku_alas_0'}
];

const mapStateToProps = state => ({
  savedActivities: state.getIn(['user', 'currentUser', 'answers', 'activities']),
  activityIndex: state.getIn(['user', 'currentUser', 'activityIndex'])
});

const mapDispatchToProps = dispatch => ({
  saveAnswer: (index, destination, answers) => dispatch(saveAnswer(index, destination, answers)),
  pushRoute: (key) => dispatch(pushRoute(key)),
  popRoute: () => dispatch(popRoute())
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ThumbVoteViewContainer extends Component {

  static propTypes = {
    saveAnswer: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    popRoute: PropTypes.func.isRequired,
    savedActivities: PropTypes.instanceOf(List),
    activityIndex: PropTypes.number.isRequired
  };

  state = {
    showBubble: true
  };

  vote = (vote) => {
    this.props.saveAnswer(this.props.activityIndex, 'thumb', vote);
    this.props.pushRoute({key: 'Record', allowReturn: true});
  };

  hideBubble = () => {
    this.setState({showBubble: false});
  };

  restartAudioAndText = () => {
    this.setState({showBubble: true});
  };

  renderBubble = (text, i, j) => {
    return this.state.showBubble ? (
      <SpeechBubble
        text={text}
        hideBubble={this.hideBubble}
        bubbleType={'puhekupla_oikea'}
        style={{top: 100, right: 250, margin: 15, fontSize: 17, size: 0.4}}
        maIndex={i}
        saIndex={j}
      />
    ) : null;
  };

  renderThumbButton = (thumb, i) => {
    return (
      <View key={i}>
        <TouchableOpacity onPress={() => this.vote(thumb.value)}>
          <Image
            source={getImage(thumb.imageName)}
            style={[styles.voteButton, getSizeByHeight(thumb.imageName, 0.25)]}/>
        </TouchableOpacity>
      </View>
    );
  };

  renderThumbButtons = () => {
    return thumbs.map((thumb, i) => this.renderThumbButton(thumb, i));
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

  renderActionPanel = () => {
    return (
      <View style={styles.actionRow}>
        {this.renderThumbButtons()}
      </View>
    );
  };

  renderLeftColumn = () => {
    return (
      <Image
        source={getImage('tausta_kapea')}
        style={[styles.leftColumn, getSizeByWidth('tausta_kapea', 0.6)]}>
        {this.renderTitlePanel()}
        {this.renderActionPanel()}
      </Image>
    );
  };

  renderRightColumn = () => {
    return (
      <View style={styles.rightColumn}>
        <Hemmo
          image={'hemmo_keski'}
          size={0.7}
          restartAudioAndText={this.restartAudioAndText}
        />
      </View>
    );
  };

  render() {
    let subActivity = this.props.savedActivities.get(this.props.activityIndex).get('sub');
    let mainActivity = this.props.savedActivities.get(this.props.activityIndex).get('main');

    return (
      <Image source={getImage('tausta_perus')} style={styles.container}>
        {this.renderLeftColumn()}
        {this.renderRightColumn()}
        {this.renderBubble('subActivity', mainActivity, subActivity)}
      </Image>
    );
  }
}
