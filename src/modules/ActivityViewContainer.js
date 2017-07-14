import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import {
  Image,
  TouchableHighlight,
  View,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { addActivity, deleteActivity } from '../state/UserState';
import LoadingSpinner from '../components/LoadingSpinner';
import { getImage, getSizeByWidth, getSizeByHeight } from '../services/graphics';

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

const thumbs = [
  { value: 1, imageName: 'peukku_ylos_0' },
  { value: 0, imageName: 'peukku_keski_0' },
  { value: -1, imageName: 'peukku_alas_0' },
];

const mapStateToProps = state => ({
  isReady: state.getIn(['session', 'isReady']),
  chosenActivities: state.getIn(['user', 'currentUser', 'answers', 'activities']),
});

const mapDispatchToProps = dispatch => ({
  addActivity: activity => dispatch(addActivity(activity)),
  deleteActivity: activity => dispatch(deleteActivity(activity)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ActivityViewContainer extends Component {

  static navigationOptions = {
    title: 'Tekeminen',
    tabBarIcon: <Image
      source={getImage('lukeminen')}
      style={getSizeByHeight('lukeminen', 0.07)}
    />,
  };

  static propTypes = {
    addActivity: PropTypes.func.isRequired,
    deleteActivity: PropTypes.func.isRequired,
    isReady: PropTypes.bool.isRequired,
    chosenActivities: PropTypes.instanceOf(Map).isRequired,
  };

  state = {
    modalVisible: false,
    chosenMainActivity: Map(),
    chosenSubActivity: Map(),
  };

  chooseMainActivity = (activity) => {
    this.setState({ chosenMainActivity: this.state.chosenMainActivity.get('id') === activity.get('id') ? Map() : activity });
  };

  chooseSubActivity = (subActivity) => {
    this.setState({ chosenSubActivity: subActivity, modalVisible: true });
  };

  chooseThumb = async (thumbValue) => {
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

    this.setState({
      modalVisible: false,
      chosenSubActivity: Map(),
    });
  };

  isSelected = thumbValue => thumbValue === this.props.chosenActivities.getIn([this.state.chosenMainActivity.get('id'), this.state.chosenSubActivity.get('id')]);

  renderThumbButton = (thumb, i) => (
    <View key={i}>
      <TouchableOpacity onPress={() => this.chooseThumb(thumb.value)}>
        <Image
          source={getImage(thumb.imageName)}
          style={[this.isSelected(thumb.value) ? styles.selectedThumbButton : styles.unselectedThumbButton, getSizeByHeight(thumb.imageName, 0.2)]}
        />
      </TouchableOpacity>
    </View>
    );

  renderThumbButtons = () => thumbs.map((thumb, i) => this.renderThumbButton(thumb, i));

  renderTitlePanel = () => (
    <View>
      <TouchableOpacity onPress={() => { this.setState({ modalVisible: false, chosenSubActivity: Map() }); }}>
        <Image
          source={getImage('nappula_rasti')}
          style={[styles.closeButton, getSizeByHeight('nappula_rasti', 0.10)]}
        />
      </TouchableOpacity>
      <Image
        source={getImage(this.state.chosenSubActivity.get('key'))}
        style={[styles.subActivityThumbImage, getSizeByWidth(this.state.chosenSubActivity.get('key'), 0.20)]}
      />
    </View>
  );

  renderActionPanel = () => (
    <View style={styles.actionRow}>
      {this.renderThumbButtons()}
    </View>
  );

  renderThumbModal = () => this.state.modalVisible ? (
    <Modal
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
    ) : null;

  renderChosenThumb = thumb => thumb !== undefined ? (
    <Image
      source={getImage(thumb.imageName)}
      style={getSizeByHeight(thumb.imageName, 0.10)}
    />
  ) : null;

  renderSubActivity = (subActivity, index) => {
    const existingThumbValue = this.props.chosenActivities.getIn([this.state.chosenMainActivity.get('id'), subActivity.get('id')]);
    const thumb = thumbs.find(t => t.value === existingThumbValue);

    return (
      <TouchableHighlight
        key={index}
        style={{ margin: 5, borderRadius: getSizeByWidth(subActivity.get('key'), 0.15).height / 2 }}
        onPress={() => this.chooseSubActivity(subActivity)}
      >
        <View>
          <Image
            source={getImage(subActivity.get('key'))}
            style={getSizeByWidth(subActivity.get('key'), 0.20)}>

            {this.renderChosenThumb(thumb)}
          </Image>
        </View>
      </TouchableHighlight>
    );
  };

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
        activeSection={!this.state.chosenMainActivity.isEmpty() ? this.state.chosenMainActivity.get('id') : false}
        renderHeader={this.renderMainActivity}
        renderContent={this.renderSubActivities}
        underlayColor={'#FFFFFF'}
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
        {this.renderThumbModal()}
      </View>
    );
  }
}
