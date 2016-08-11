import React, {PropTypes} from 'react';
import {List} from 'immutable';
import Icon from 'react-native-vector-icons/FontAwesome';
import TitlePanel from '../../../components/TitlePanel';
import * as UserState from '../../../modules/user/UserState';
import * as NavigationState from '../../../modules/navigation/NavigationState';
import SpeechBubbleView from '../../../components/SpeechBubbleView';
import {post} from '../../../utils/api';
import {getSize, getImage} from '../../../services/graphics';

import {
  View,
  Image
} from 'react-native';

var styles = require('./styles.js');
var thumb_values = [
  {value: 1, text: 'like', icon: 'thumbs-up'},
  {value: 0, text: 'neutral', icon: 'meh-o'},
  {value: -1, text: 'dislike', icon: 'thumbs-down'}
];

//TODO: Separate rendering to smaller components.
const ThumbVote = React.createClass({

  propTypes: {
    savedActivities: PropTypes.instanceOf(List),
    dispatch: PropTypes.func.isRequired,
    activityIndex: PropTypes.number.isRequired
  },

  getInitialState() {
    return {
      showBubble: true
    };
  },

  vote(vote) {

    var answer = thumb_values[vote].text;
    var question = 'Millaista se oli?';
    var type = 'like';

    post('/content/', {contentType: type, answer, question})
      .then(
        result => {
          this.props.dispatch(
            UserState.saveAnswer(this.props.activityIndex, 'thumb', answer, result.contentId)
          );

          this.props.dispatch(
            NavigationState.pushRoute({key: 'Record', allowReturn: true})
          );
        }
      );
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  renderBubble(text, i, j) {
    if (this.state.showBubble === true) {
      return (
        <SpeechBubbleView
          text={text}
          hideBubble={this.hideBubble}
          bubbleType={'puhekupla_oikea'}
          style={{top: 120, left: 160, margin: 15, fontSize: 15, size: 0.5}}
          maIndex={i}
          saIndex={j}/>
      );
    }
    else {
      return null;
    }
  },

  renderThumbButtons() {
    var thumbs = [];

    for (var i = 0; i <= 2; i++) {
      thumbs.push(
        <View key={i}>
          <Icon
            onPress={this.vote.bind(this, i)}
            name={thumb_values[i].icon}
            size={100}
            style={styles.voteButton}/>
        </View>
      );
    }
    return thumbs;
  },

  render() {

    var titlePanel = (
      <TitlePanel
      activityIndex={this.props.activityIndex}
      savedActivities={this.props.savedActivities}
      dispatch={this.props.dispatch}/>
    );

    var thumbs = this.renderThumbButtons();

    var actionPanel = (
      <View style={styles.actionRow}>
        {thumbs}
      </View>
    );

    var j = this.props.savedActivities.get(this.props.activityIndex).get('sub').get('content');
    var i = this.props.savedActivities.get(this.props.activityIndex).get('main').get('content');
    var speechBubble = this.renderBubble('subActivity', i, j);

    return (
      <Image source={getImage('tausta_perus2')} style={styles.container}>
          <Image source={getImage('tausta_kapea')} style={[styles.leftColumn, getSize('tausta_kapea', 0.95)]}>
            {titlePanel}
            {actionPanel}
          </Image>
        <View style={styles.rightColumn}>
          <Image source={getImage('hemmo_keski')} style={getSize('hemmo_keski', 0.7)}/>
        </View>
        {speechBubble}
      </Image>
    );
  }
});

export default ThumbVote;
