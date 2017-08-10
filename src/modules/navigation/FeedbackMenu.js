import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { patch, xhr } from '../../utils/api';
import {
  Image,
  Dimensions,
  Alert,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import AppButton from '../../components/AppButton';
import { getImage } from '../../services/graphics';
import { setAudio } from '../../state/HemmoState';

const phrases = require('../../data/phrases.json');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: null,
    width: null,
  },
});

const mapStateToProps = state => ({
  users: state.getIn(['user', 'users']),
  currentUser: state.getIn(['user', 'currentUser']),
  selectedActivities: state.getIn([
    'user',
    'currentUser',
    'answers',
    'activities',
  ]),
  selectedMoods: state.getIn(['user', 'currentUser', 'answers', 'moods']),
  freeWord: state.getIn(['user', 'currentUser', 'answers', 'freeWord']),
  feedbackId: state.getIn(['user', 'currentUser', 'answers', 'feedbackId']),
});

const mapDispatchToProps = dispatch => ({
  pushRoute: route =>
    dispatch(NavigationActions.navigate({ routeName: route })),
  setAudio: audio => dispatch(setAudio(audio)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class FeedbackMenu extends Component {
  renderBigButton = (background, onPress, done) =>
    <View style={{ paddingVertical: 10 }}>
      <AppButton
        width={Dimensions.get('window').width * 0.8}
        onPress={onPress}
        background={background}
        shadow
      >
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          {done
            ? <Image
                source={require('../../../assets/graphics/others/checkmark_big_s2dp.png')}
                style={{ width: 72, height: 72 }}
              />
            : null}
        </View>
      </AppButton>
    </View>;

  renderSendButton = (onPress, disabled) =>
    <View style={{ paddingTop: 32, paddingBottom: 16 }}>
      <AppButton
        width={Dimensions.get('window').width * 0.5}
        onPress={onPress}
        background="envelope_closed"
        disabled={disabled}
        shadow
      />
    </View>;

  getRequestBody = () => {
    const namedActivities = [];

    this.props.selectedActivities.entrySeq().forEach(mainActivity => {
      const main = mainActivity[0];

      mainActivity[1].entrySeq().forEach(subActivity => {
        const sub = subActivity[0];
        const like = subActivity[1];

        namedActivities.push({ main, sub, like });
      });
    });

    return {
      activities: namedActivities,
      moods: this.props.selectedMoods.toJS(),
    };
  };

  sendFeedback = async () => {
    const feedbackId = this.props.feedbackId;

    try {
      await patch(`/app/feedback/${feedbackId}`, this.getRequestBody());

      this.props.freeWord.map(async item => {
        const type = item.keys().next().value;
        const content = item.values().next().value;
        let attachmentBody = new FormData();

        if (type === 'audio') {
          let file = {
            uri: `file://${content}`,
            type: 'audio/mp4',
            name: 'file',
          };

          attachmentBody.append('data', file);
        } else {
          attachmentBody.append('data', content);
        }

        await xhr(
          'POST',
          `/app/feedback/${feedbackId}/attachments`,
          attachmentBody,
        );
      });

      this.props.pushRoute('Ending');
    } catch (error) {
      console.log(error);
      await this.props.setAudio(phrases.oh_no.audio);
      Alert.alert(
        'Voi ei, en pystynyt lähettämään viestiäsi!',
        phrases.oh_no.text,
      );
    }
  };

  render() {
    return (
      <Image source={getImage('tausta_perus3').normal} style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 5,
            alignItems: 'center',
            marginTop: 25,
          }}
        >
          {this.renderBigButton(
            'whatdoned',
            () => this.props.pushRoute('Activity'),
            this.props.selectedActivities.size,
          )}
          {this.renderBigButton(
            'howfelt',
            () => this.props.pushRoute('Mood'),
            this.props.selectedMoods.size,
          )}
          {this.renderBigButton(
            'tellfreely',
            () => this.props.pushRoute('FreeWord'),
            this.props.freeWord.size,
          )}

          {this.renderSendButton(
            this.sendFeedback,
            !this.props.selectedActivities.size &&
              !this.props.selectedMoods.size &&
              !this.props.freeWord.size,
          )}
        </ScrollView>
      </Image>
    );
  }
}
