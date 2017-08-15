import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text,
  Modal,
  Image,
  Alert,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { patch, xhr } from '../../utils/api';
import AppButton from '../../components/AppButton';
import { getImage, getSizeByWidth } from '../../services/graphics';
import { showExitModal, hideExitModal } from '../../state/SessionState';
import { resetCurrentUser } from '../../state/UserState';
import { setAudio, setText } from '../../state/HemmoState';

const phrases = require('../../data/phrases.json');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: null,
    width: null,
    paddingTop: 50,
  },
  userImage: {
    height: Platform.OS === 'android' ? 50 : 40,
    width: Platform.OS === 'android' ? 50 : 40,
    borderRadius: Platform.OS === 'android' ? 25 : 20,
  },
  circle: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 5,
    ...Platform.select({
      ios: {
        top: 20,
      },
    }),
  },
  exitModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  buttonText: {
    fontSize: 25,
    fontFamily: 'ComicNeue-Bold',
  },
  navigationButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitModalTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitModalText: {
    padding: 20,
    margin: 10,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'ComicNeue-Bold',
  },
  navigationButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  exitModalVisible: state.getIn(['session', 'exitModalVisible']),
  users: state.getIn(['user', 'users']),
  currentUser: state.getIn(['user', 'currentUser']),
  activeRoute: state.getIn([
    'navigatorState',
    'routes',
    state.getIn(['navigatorState', 'index']),
    'routeName',
  ]),
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
  showExitModal: () => dispatch(showExitModal()),
  hideExitModal: () => dispatch(hideExitModal()),
  pushRoute: route =>
    dispatch(NavigationActions.navigate({ routeName: route })),
  setAudio: audio => dispatch(setAudio(audio)),
  setText: text => dispatch(setText(text)),
  back: () => {
    dispatch(setText(''));
    dispatch(setAudio(''));
    dispatch(NavigationActions.back());
  },
  resetCurrentUser: () => dispatch(resetCurrentUser()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class FeedbackMenu extends Component {
  renderBigButton = (background, onPress, done) =>
    <View style={{ paddingVertical: 10 }}>
      <AppButton
        width={getSizeByWidth('whatdoned', 0.9).width}
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
        width={getSizeByWidth('envelope_closed', 0.5).width}
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
        [{ text: 'OK', onPress: () => this.props.setAudio('') }],
      );
    }
  };

  quit = () => {
    this.props.resetCurrentUser();
    this.props.back();
    this.props.hideExitModal();
  };

  continue = () => {
    this.props.hideExitModal();
  };

  renderExitModalText = () =>
    <Text style={styles.exitModalText}>
      Haluatko lopettaa palautteen antamisen?
    </Text>;

  renderNoButton = () =>
    <View style={styles.navigationButton}>
      <AppButton
        background="no"
        onPress={this.continue}
        width={getSizeByWidth('no', 0.2).width}
      />
      <Text style={styles.buttonText}>Peruuta</Text>
    </View>;

  renderYesButton = () =>
    <View style={styles.navigationButton}>
      <AppButton
        background="yes"
        onPress={this.quit}
        width={getSizeByWidth('yes', 0.2).width}
      />
      <Text style={styles.buttonText}>Lopeta</Text>
    </View>;

  renderExitModal = () =>
    this.props.showExitModal
      ? <Modal
          animationType={'fade'}
          transparent
          visible={this.props.exitModalVisible}
          onRequestClose={() => this.props.hideExitModal()}
          supportedOrientations={['portrait', 'landscape']}
        >
          <View style={styles.exitModal}>
            <Image
              source={getImage('modal').shadow}
              style={getSizeByWidth('modal', 0.9)}
            >
              <View style={styles.exitModalTextContainer}>
                {this.renderExitModalText()}
              </View>
              <View style={styles.navigationButtons}>
                {this.renderNoButton()}
                {this.renderYesButton()}
              </View>
            </Image>
          </View>
        </Modal>
      : null;

  renderUserImage = () =>
    <TouchableOpacity
      onPress={() => this.props.showExitModal()}
      style={styles.circle}
    >
      <Image
        style={styles.userImage}
        source={
          this.props.currentUser.get('image')
            ? { uri: this.props.currentUser.get('image') }
            : getImage('profilephoto').normal
        }
      />
    </TouchableOpacity>;

  render() {
    return (
      <Image source={getImage('forest').normal} style={styles.container}>
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
        {this.renderUserImage()}
        {this.renderExitModal()}
      </Image>
    );
  }
}
