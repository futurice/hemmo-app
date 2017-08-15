import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { Image, View, ScrollView, StyleSheet, Modal, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Accordion from 'react-native-collapsible/Accordion';
import { addActivity, deleteActivity } from '../state/UserState';
import { setText, setAudio } from '../state/HemmoState';
import LoadingSpinner from '../components/LoadingSpinner';
import SaveConfirmationWindow from '../components/SaveConfirmationWindow';
import {
  getImage,
  getSizeByWidth,
  getSizeByHeight,
} from '../services/graphics';
import AppButton from '../components/AppButton';
import DoneButton from '../components/DoneButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null,
  },
  title: {
    fontSize: 20,
    margin: 17,
    fontFamily: 'Roboto-Medium',
    color: '#000',
  },
  thumbModal: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainActivity: {
    alignSelf: 'center',
    marginTop: 7,
  },
  subActivityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chosenThumb: {
    position: 'absolute',
    alignSelf: 'flex-start',
    right: 0,
  },
  titleRow: {},
  closeButton: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  subActivityThumbImage: {
    margin: 24,
    alignSelf: 'center',
    width: 175,
    height: 175,
  },
  thumbRow: {
    marginVertical: 32,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbModalQuestion: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'ComicNeue-Bold',
    fontSize: 20,
  },
  voteButton: {
    margin: 5,
  },
  selectedThumbButton: {
    margin: 5,
  },
  unselectedThumbButton: {
    margin: 5,
    opacity: 0.5,
  },
});

const activities = require('../data/activities.js');

const animationDuration = 300;

const thumbs = [
  { value: 1, imageName: 'thumb_up' },
  { value: 0, imageName: 'thumb_middle' },
  { value: -1, imageName: 'thumb_down' },
];

const mapStateToProps = state => ({
  isReady: state.getIn(['session', 'isReady']),
  chosenActivities: state.getIn([
    'user',
    'currentUser',
    'answers',
    'activities',
  ]),
});

const mapDispatchToProps = dispatch => ({
  back: () => dispatch(NavigationActions.back()),
  addActivity: activity => dispatch(addActivity(activity)),
  deleteActivity: activity => dispatch(deleteActivity(activity)),
  setText: text => dispatch(setText(text)),
  setAudio: audio => dispatch(setAudio(audio)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ActivityViewContainer extends Component {
  static navigationOptions = {
    title: 'Tekeminen',
  };

  static propTypes = {
    back: PropTypes.func.isRequired,
    addActivity: PropTypes.func.isRequired,
    deleteActivity: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    setAudio: PropTypes.func.isRequired,
    isReady: PropTypes.bool.isRequired,
    chosenActivities: PropTypes.instanceOf(Map).isRequired,
  };

  state = {
    modalVisible: false,
    showSucceedingMessage: false,
    chosenMainActivity: Map(),
    chosenSubActivity: Map(),
  };

  getSubActivityHeight = () =>
    getSizeByWidth('leikkiminen', 0.22).height + 2 * 5;

  getMainActivityHeight = () =>
    getSizeByWidth('puuhasimme', 0.5).height + 2 * 5;

  chooseMainActivity = async activity => {
    const margin = 5;

    setTimeout(
      () =>
        this.scrollView.scrollTo({
          y:
            activity.get('id') *
            (getSizeByWidth('puuhasimme', 0.5).height + 2 * margin),
        }),
      0,
    );

    if (this.state.chosenMainActivity.get('id') === activity.get('id')) {
      await this.props.setAudio('');

      this.setState({
        chosenMainActivity: Map(),
      });
    } else {
      this.setState({
        chosenMainActivity: activity,
      });

      await this.props.setAudio(activity.get('audio'));
    }
  };

  chooseSubActivity = async subActivity => {
    await this.props.setAudio(subActivity.get('audio'));
    this.setState({ chosenSubActivity: subActivity, modalVisible: true });
  };

  chooseThumb = async thumbValue => {
    if (this.isSelected(thumbValue)) {
      await this.props.deleteActivity({
        main: this.state.chosenMainActivity.get('name'),
        sub: this.state.chosenSubActivity.get('name'),
      });
    } else {
      await this.props.addActivity({
        main: this.state.chosenMainActivity.get('name'),
        sub: this.state.chosenSubActivity.get('name'),
        thumb: thumbValue,
      });

      setTimeout(this.closeModal, 1000);
    }
  };

  closeModal = () => {
    this.props.setText('');
    this.props.setAudio('');

    this.setState({
      modalVisible: false,
      chosenSubActivity: Map(),
    });
  };

  isSelected = thumbValue =>
    thumbValue ===
    this.props.chosenActivities.getIn([
      this.state.chosenMainActivity.get('name'),
      this.state.chosenSubActivity.get('name'),
    ]);

  renderThumbButton = (thumb, i) =>
    <View
      key={i}
      style={
        this.isSelected(thumb.value)
          ? styles.selectedThumbButton
          : styles.unselectedThumbButton
      }
    >
      <AppButton
        background={thumb.imageName}
        onPress={() => this.chooseThumb(thumb.value)}
        width={getSizeByWidth('thumb_up', 0.11).width}
        shadow={this.isSelected(thumb.value)}
      />
    </View>;

  renderThumbButtons = () =>
    thumbs.map((thumb, i) => this.renderThumbButton(thumb, i));

  renderCloseButton = () =>
    <View style={styles.closeButton}>
      <AppButton
        background="close_small"
        onPress={this.closeModal}
        width={getSizeByHeight('close_small', 0.12).height}
      />
    </View>;

  renderThumbButtonRow = () =>
    <View style={styles.thumbRow}>
      {this.renderThumbButtons()}
    </View>;

  renderThumbModal = () =>
    this.state.modalVisible
      ? <Modal
          animationType={'fade'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={this.closeModal}
          supportedOrientations={['portrait', 'landscape']}
        >
          <View style={styles.thumbModal}>
            <Image
              source={getImage('modal').normal}
              style={getSizeByWidth('modal', 0.5)}
            >
              <View style={styles.titleRow}>
                {this.renderCloseButton()}
                <Image
                  source={
                    getImage(this.state.chosenSubActivity.get('key')).normal
                  }
                  style={styles.subActivityThumbImage}
                />
              </View>
              <Text style={styles.thumbModalQuestion}>
                {this.state.chosenSubActivity.get('text')}
              </Text>
              {this.renderThumbButtonRow()}
            </Image>
          </View>
        </Modal>
      : null;

  renderChosenThumb = thumb =>
    thumb !== undefined
      ? <Image
          source={getImage(thumb.imageName).shadow}
          style={[styles.chosenThumb, getSizeByHeight(thumb.imageName, 0.15)]}
        />
      : null;

  renderSubActivity = (subActivity, index) => {
    const existingThumbValue = this.props.chosenActivities.getIn([
      this.state.chosenMainActivity.get('name'),
      subActivity.get('name'),
    ]);

    const thumb = thumbs.find(t => t.value === existingThumbValue);

    return (
      <View style={styles.subActivity} key={index}>
        <AppButton
          background={subActivity.get('key')}
          onPress={() => this.chooseSubActivity(subActivity)}
          width={getSizeByWidth('leipominen', 0.22).width}
          shadow
        >
          {this.renderChosenThumb(thumb)}
        </AppButton>
      </View>
    );
  };

  renderSubActivities = mainActivity =>
    <View style={styles.subActivityContainer}>
      {mainActivity
        .get('subActivities')
        .map((subActivity, index) =>
          this.renderSubActivity(subActivity, index),
        )}
    </View>;

  renderMainActivity = (mainActivity, index) =>
    <View style={styles.mainActivity} key={index}>
      <AppButton
        background={mainActivity.get('key')}
        onPress={() => this.chooseMainActivity(mainActivity)}
        width={getSizeByWidth('puuhasimme', 0.5).width}
        shadow
      />
    </View>;

  renderMainActivities = () =>
    <ScrollView
      /**
       * This is a hack which allows scrolling to positions currently outside of
       * the ScrollView. As soon as an activity is selected, expand the scrolling
       * view height to equal to the height of all visible activities and
       * subactivities.
       */
      contentContainerStyle={{
        minHeight: this.state.chosenMainActivity.isEmpty()
          ? null
          : activities.length * this.getMainActivityHeight() +
            Math.ceil(
              this.state.chosenMainActivity.get('subActivities').size /
                2 *
                this.getSubActivityHeight(),
            ),
      }}
      ref={scrollView => {
        this.scrollView = scrollView;
      }}
    >
      <Accordion
        align="bottom"
        duration={animationDuration}
        sections={activities}
        activeSection={
          !this.state.chosenMainActivity.isEmpty()
            ? this.state.chosenMainActivity.get('id')
            : false
        }
        renderHeader={this.renderMainActivity}
        renderContent={this.renderSubActivities}
        underlayColor={'#fff'}
      />
    </ScrollView>;

  hideSucceedingMessage = () => {
    if (this.state.showSucceedingMessage) {
      this.setState({ showSucceedingMessage: false });
      this.props.back();
    }
  };

  renderSaveConfirmationWindow = () =>
    <SaveConfirmationWindow
      closeWindow={this.hideSucceedingMessage}
      visible={this.state.showSucceedingMessage}
    />;

  render() {
    if (!this.props.isReady) {
      return <LoadingSpinner />;
    }

    return (
      <Image source={getImage('forest').normal} style={styles.container}>
        {this.renderMainActivities()}
        {this.renderThumbModal()}
        <DoneButton
          onPress={() => this.setState({ showSucceedingMessage: true })}
          disabled={this.props.chosenActivities.size === 0}
        />
        {this.renderSaveConfirmationWindow()}
      </Image>
    );
  }
}
