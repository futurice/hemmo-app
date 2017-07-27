import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import {
  Image,
  View,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Accordion from 'react-native-collapsible/Accordion';
import { addActivity, deleteActivity } from '../state/UserState';
import { setText, setAudio } from '../state/HemmoState';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  getImage,
  getSizeByWidth,
  getSizeByHeight,
} from '../services/graphics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    margin: 17,
  },
  thumbModal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subActivityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  actionRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbSubActivityContainer: {
    alignSelf: 'center',
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginTop: 15,
  },
  subActivityThumbImage: {
    alignSelf: 'center',
    margin: 5,
  },
  voteButton: {
    margin: 5,
  },
  selectedThumbButton: {
    margin: 5,
    opacity: 0.4,
  },
  unselectedThumbButton: {
    margin: 5,
  },
});

const activities = require('../data/activities.js');
const phrases = require('../data/phrases.json');

const animationDuration = 300;

const thumbs = [
  { value: 1, imageName: 'peukku_ylos_0' },
  { value: 0, imageName: 'peukku_keski_0' },
  { value: -1, imageName: 'peukku_alas_0' },
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
    tabBarIcon: (
      <Image
        source={require('./icon_activities.png')}
        style={{ width: 64, height: 64 }}
      />
    ),
  };

  static propTypes = {
    addActivity: PropTypes.func.isRequired,
    deleteActivity: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    setAudio: PropTypes.func.isRequired,
    isReady: PropTypes.bool.isRequired,
    chosenActivities: PropTypes.instanceOf(Map).isRequired,
  };

  state = {
    modalVisible: false,
    chosenMainActivity: Map(),
    chosenSubActivity: Map(),
  };

  componentWillMount() {
    this.props.setText(phrases.Activity.text);
    this.props.setAudio(phrases.Activity.audio);
  }

  getSubActivityHeight = () =>
    getSizeByWidth('leikkiminen', 0.2).height + 2 * 5;

  getMainActivityHeight = () => getSizeByWidth('nelio', 0.3).height + 2 * 5;

  chooseMainActivity = activity => {
    const margin = 5;

    setTimeout(
      () =>
        this.scrollView.scrollTo({
          y:
            activity.get('id') *
            (getSizeByWidth('nelio', 0.3).height + 2 * margin),
        }),
      0,
    );

    if (this.state.chosenMainActivity.get('id') === activity.get('id')) {
      this.setState({
        chosenMainActivity: Map(),
      });

      this.props.setText('');
      this.props.setAudio('');
    } else {
      this.setState({
        chosenMainActivity: activity,
      });

      this.props.setText(activity.get('text'));
      this.props.setAudio(activity.get('audio'));
    }
  };

  chooseSubActivity = subActivity => {
    this.props.setAudio(subActivity.get('audio'));
    this.setState({ chosenSubActivity: subActivity, modalVisible: true });
  };

  chooseThumb = async thumbValue => {
    if (this.isSelected(thumbValue)) {
      await this.props.deleteActivity({
        main: this.state.chosenMainActivity.get('id'),
        sub: this.state.chosenSubActivity.get('id'),
      });
    } else {
      await this.props.addActivity({
        main: this.state.chosenMainActivity.get('id'),
        sub: this.state.chosenSubActivity.get('id'),
        thumb: thumbValue,
      });
    }

    this.closeModal();
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
      this.state.chosenMainActivity.get('id'),
      this.state.chosenSubActivity.get('id'),
    ]);

  renderThumbButton = (thumb, i) =>
    <View key={i}>
      <TouchableOpacity onPress={() => this.chooseThumb(thumb.value)}>
        <Image
          source={getImage(thumb.imageName)}
          style={[
            this.isSelected(thumb.value)
              ? styles.selectedThumbButton
              : styles.unselectedThumbButton,
            getSizeByHeight(thumb.imageName, 0.2),
          ]}
        />
      </TouchableOpacity>
    </View>;

  renderThumbButtons = () =>
    thumbs.map((thumb, i) => this.renderThumbButton(thumb, i));

  renderTitlePanel = () =>
    <View>
      <TouchableOpacity onPress={this.closeModal}>
        <Image
          source={getImage('nappula_rasti')}
          style={[styles.closeButton, getSizeByHeight('nappula_rasti', 0.1)]}
        />
      </TouchableOpacity>
      <Image
        source={getImage(this.state.chosenSubActivity.get('key'))}
        style={[
          styles.subActivityThumbImage,
          getSizeByWidth(this.state.chosenSubActivity.get('key'), 0.2),
        ]}
      />
    </View>;

  renderActionPanel = () =>
    <View style={styles.actionRow}>
      {this.renderThumbButtons()}
    </View>;

  renderThumbModal = () =>
    this.state.modalVisible
      ? <Modal
          animationType={'fade'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => console.log(' ')}
          supportedOrientations={['portrait', 'landscape']}
        >
          <View style={styles.thumbModal}>
            <Image
              source={getImage('tausta_kapea')}
              style={[styles.leftColumn, getSizeByWidth('tausta_kapea', 0.5)]}
            >
              {this.renderTitlePanel()}
              {this.renderActionPanel()}
            </Image>
          </View>
        </Modal>
      : null;

  renderChosenThumb = thumb =>
    thumb !== undefined
      ? <Image
          source={getImage(thumb.imageName)}
          style={getSizeByHeight(thumb.imageName, 0.1)}
        />
      : null;

  renderSubActivity = (subActivity, index) => {
    const existingThumbValue = this.props.chosenActivities.getIn([
      this.state.chosenMainActivity.get('id'),
      subActivity.get('id'),
    ]);
    const thumb = thumbs.find(t => t.value === existingThumbValue);

    return (
      <TouchableOpacity
        key={index}
        style={{
          margin: 5,
          borderRadius: getSizeByWidth(subActivity.get('key'), 0.15).height / 2,
        }}
        onPress={() => this.chooseSubActivity(subActivity)}
      >
        <View>
          <Image
            source={getImage(subActivity.get('key'))}
            style={getSizeByWidth(subActivity.get('key'), 0.2)}
          >
            {this.renderChosenThumb(thumb)}
          </Image>
        </View>
      </TouchableOpacity>
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
    <TouchableOpacity
      key={index}
      style={[{ margin: 5, alignSelf: 'center' }, getSizeByWidth('nelio', 0.3)]}
      onPress={() => this.chooseMainActivity(mainActivity)}
    >
      <Image
        style={getSizeByWidth('nelio', 0.3)}
        source={mainActivity.get('imageRoute')}
      />
    </TouchableOpacity>;

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
        onChange={index => console.log('active index', index)}
        sections={activities}
        activeSection={
          !this.state.chosenMainActivity.isEmpty()
            ? this.state.chosenMainActivity.get('id')
            : false
        }
        renderHeader={this.renderMainActivity}
        renderContent={this.renderSubActivities}
        underlayColor={'#FFFFFF'}
      />
    </ScrollView>;

  render() {
    if (!this.props.isReady) {
      return <LoadingSpinner />;
    }

    return (
      <View style={styles.container}>
        {this.renderMainActivities()}
        {this.renderThumbModal()}
        <TouchableOpacity onPress={this.props.back}>
          <Image
            source={require('./done.png')}
            style={{ width: 120, height: 60 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
