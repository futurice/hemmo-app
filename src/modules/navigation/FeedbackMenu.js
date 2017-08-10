import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import { Map } from 'immutable';
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
import { getImage, getSizeByWidth, getFontSize } from '../../services/graphics';
import {
  showExitModal,
  hideExitModal,
  toggleIsLoading,
} from '../../state/SessionState';
import { resetCurrentUser, editUser } from '../../state/UserState';
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
    paddingTop: getFontSize(5),
  },
  userImage: {
    width: getFontSize(5),
    height: getFontSize(5),
    borderRadius: getFontSize(2.5),
  },
  circle: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: getFontSize(1),
    ...Platform.select({
      ios: {
        top: 17,
      },
    }),
    borderRadius: getFontSize(7),
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    elevation: 5,
  },
  exitModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  buttonText: {
    fontSize: getFontSize(2.5),
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
    margin: getFontSize(5),
    textAlign: 'center',
    fontSize: getFontSize(3),
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
  toggleIsLoading: loading => dispatch(toggleIsLoading(loading)),
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
  editUser: user => dispatch(editUser(user)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class FeedbackMenu extends Component {
  renderBigButton = (background, onPress, done) =>
    <View style={{ paddingVertical: 10 }}>
      <AppButton
        width={getSizeByWidth('whatdoned', 0.85).width}
        onPress={onPress}
        background={background}
        shadow
      >
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          {done
            ? <Image
                source={getImage('checkmark_big').shadow}
                style={getSizeByWidth('checkmark_big', 0.12)}
              />
            : null}
        </View>
      </AppButton>
    </View>;

  renderSendButton = (onPress, disabled) =>
    <View style={{ paddingTop: 16, paddingBottom: 16 }}>
      <AppButton
        width={getSizeByWidth('envelope_closed', 0.45).width}
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
    this.props.toggleIsLoading(true);
    const feedbackId = this.props.feedbackId;

    this.props.editUser(
      Map({
        id: this.props.currentUser.get('id'),
        lastFeedbackSentOn: Date.now(),
      }),
    );

    this.props.toggleIsLoading(false);
    this.props.pushRoute('Ending');

    // try {
    //   await patch(`/app/feedback/${feedbackId}`, this.getRequestBody());
    //
    //   this.props.freeWord.map(async item => {
    //     const type = item.type;
    //     const content = item.content;
    //     let attachmentBody = new FormData();
    //
    //     if (type === 'audio') {
    //       let file = {
    //         uri: `file://${content}`,
    //         type: 'audio/mp4',
    //         name: 'file',
    //       };
    //
    //       attachmentBody.append('data', file);
    //     } else {
    //       attachmentBody.append('data', content);
    //     }
    //
    //     await xhr(
    //       'POST',
    //       `/app/feedback/${feedbackId}/attachments`,
    //       attachmentBody,
    //     );
    //   });
    //
    //   this.props.editUser(
    //     Map({
    //       id: this.props.currentUser.get('id'),
    //       lastFeedbackSentOn: Date.now(),
    //     }),
    //   );
    //
    //   this.props.toggleIsLoading(false);
    //   this.props.pushRoute('Ending');
    // } catch (error) {
    //   console.log(error);
    //   this.props.toggleIsLoading(false);
    //   await this.props.setAudio(phrases.oh_no.audio);
    //   Alert.alert(
    //     'Voi ei, en pystynyt lähettämään viestiäsi!',
    //     phrases.oh_no.text,
    //     [{ text: 'OK', onPress: () => this.props.setAudio('') }],
    //   );
    // }
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
