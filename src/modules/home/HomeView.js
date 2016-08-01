import * as NavigationState from '../../modules/navigation/NavigationState';
import * as UserState from '../../modules/user/UserState';
import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import SpeechBubble from '../../components/SpeechBubble';
import PasswordModal from '../../components/PasswordModal';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';

var styles = require('./styles.js');
var bubbleText;

const HomeView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map)
  },

  getInitialState() {
    return {
      isPasswordModalOpen: false
    };
  },

  openSettings() {
    this.props.dispatch(UserState.resetCurrentUser());
    this.props.dispatch(NavigationState.pushRoute({key: 'Settings', allowReturn: true}));
  },

  startJourney(id) {
    this.props.dispatch(UserState.setCurrentUser(id));
    this.props.dispatch(UserState.addActivity());
    this.props.dispatch(NavigationState.pushRoute({key: 'Activity', allowReturn: true}));
  },

  viewUserProfile(userIndex) {
    this.props.dispatch(UserState.setCurrentUser(userIndex));
    this.props.dispatch(NavigationState.pushRoute({key: 'Settings', allowReturn: true}));
  },

  openModal() {
    this.setState({isPasswordModalOpen: true});
  },

  closeModal() {
    this.setState({isPasswordModalOpen: false});
  },

  // TODO: Clean up. Too much repetition atm.
  render() {
    var userIcons;

    if (this.props.users.size > 0) {
      if (this.props.users.size > 4) {
        userIcons = this.props.users.map((user, index) => (
          <View key={index} style={styles.userRowWithoutImage}>
            <View style={styles.nameLabel}>
              <TouchableHighlight
                onPress={this.startJourney.bind(this, index)}>
                <Text style={styles.name}> {user.get('name')} </Text>
              </TouchableHighlight>
            </View>
          </View>
        ));
      }
      else {
        userIcons = this.props.users.map((user, index) => (
          <View key={index} style={styles.userRow}>
            <View>
              <TouchableHighlight
                onPress={this.startJourney.bind(this, index)}>
                <Image style={styles.icon} source={{uri: user.get('image')}}/>
              </TouchableHighlight>
            </View>
            <View style={styles.nameLabel}>
              <Text style={styles.name}> {user.get('name')} </Text>
            </View>
          </View>
        ));
      }
      bubbleText = 'userIsKnown';
    }
    else {
      userIcons = (
        <View style={styles.emptyRow}>
          <Image style={styles.icon} source={require('../../../assets/default-icon.png')}/>
          <View style={styles.nameLabel}>
            <Text style={styles.name}> Nimi </Text>
          </View>
        </View>);
      bubbleText = 'userIsUnknown';
    }

    var speechBubble = (<SpeechBubble
      text={bubbleText}
      audioTrack={'longer'}
      position={{x: 20, y: 240, triangle: 140}}/>);
    if (this.state.isPasswordModalOpen === true) {
      var passwordModal = <PasswordModal onClose={this.closeModal} onSuccess={this.openSettings}/>;
    }
    else {
      passwordModal = null;
    }

    return (
        <Image source={require('../../../assets/graphics/1/g113321.png')} style={styles.container}>
        <View style={styles.leftcolumn}>

          <View style={styles.settingsButton}>
            <TouchableHighlight
              onPress={this.openModal}>
              <Image source={require('../../../assets/graphics/1/g113322.png')} style={{height: 40, width: 40}}/>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.rightcolumn}>
          {userIcons}
        </View>
        {speechBubble}
        {passwordModal}
        </Image>
    );
  }
});

export default HomeView;
