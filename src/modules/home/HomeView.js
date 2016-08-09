import * as NavigationState from '../navigation/NavigationState';
import * as UserState from '../user/UserState';
import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import SpeechBubble from '../../components/SpeechBubble';
import SpeechBubbleView from '../../components/SpeechBubbleView';
import PasswordModal from '../../components/PasswordModal';
import {setAuthenticationToken} from '../../utils/authentication';
import {setSessionId} from '../../utils/session';
import {post} from '../../utils/api';
import {getScreenHeight, getScreenWidth} from '../../services/screenSize';

import {
  TouchableHighlight,
  Image,
  Text,
  Dimensions,
  View
} from 'react-native';

var styles = require('./styles.js');
var height;
var width;
var graphics = require('../../components/graphics.js');

const HomeView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map)
  },

  getInitialState() {
    return {
      isPasswordModalOpen: false,
      showBubble: true
    };
  },

  openSettings() {
    this.props.dispatch(UserState.resetCurrentUser());
    this.props.dispatch(NavigationState.pushRoute({key: 'Settings', allowReturn: true}));
  },

  startJourney(id) {
    this.props.dispatch(UserState.setCurrentUser(id))
      .then(setAuthenticationToken(this.props.currentUser.get('token')))
      .then(this.startSession());
    this.props.dispatch(UserState.addActivity());
    this.props.dispatch(NavigationState.pushRoute({key: 'Activity', allowReturn: true}));
  },

  startSession() {
    post('/session/')
      .then(result => setSessionId(result.sessionId));
  },

  openPasswordModal() {
    this.setState({isPasswordModalOpen: true});
  },

  closePasswordModal() {
    this.setState({isPasswordModalOpen: false});
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  // TODO: Clean up. Too much repetition atm.
  render() {
    var userIcons = [];
    var h = getScreenHeight() / 2 - 30;
    var w = h * 0.8;

    if (this.props.users.size > 0) {
      for (var i = 0; i < this.props.users.size; i++) {

        var name = (
          <Text
            ellipsizeMode='tail'
            numberOfLines={1}
            style={styles.name}> {this.props.users.get(i).get('name')} </Text>
        );

        /* If app has more than 4 children in it, only names of the children are displayed */
        if (this.props.users.size > 4) {
          userIcons.push(
            <View key={i} style={styles.userRowWithoutImage}>
              <View>
                <TouchableHighlight
                  onPress={this.startJourney.bind(this, i)}>
                  {name}
                </TouchableHighlight>
              </View>
            </View>
          );

          var rightcolumn = <View style={styles.rightcolumn}>{userIcons}</View>;
        }
        else {
          userIcons.push(
            <Image
              source={graphics.get('kehys_iso')}
              key={i}
              style={[styles.userRow, {height: h , width: w}]}>
              <TouchableHighlight
                onPress={this.startJourney.bind(this, i)}>
                <Image
                  style={{height: h * 0.7, width: w - 10}}
                  source={{uri: this.props.users.get(i).get('image')}}/>
              </TouchableHighlight>
              <View style={{width: w - 10}}>
                {name}
              </View>
            </Image>
          );

          rightcolumn = (
            <View style={[styles.rightcolumn, {flexDirection: 'row', flexWrap: 'wrap'}]}>
              {userIcons}
            </View>
          );
        }
      }

      if (this.state.showBubble === true) {
        var speechBubble = (
          <SpeechBubbleView
            text={'userIsKnown'}
            hideBubble={this.hideBubble}
            bubbleType={graphics.get('puhekupla_vasen2')}
            style={{top: 40, left: 280, height: 250, width: 285, margin: 20, marginTop: 20}}/>
          );
      }
      else {
        speechBubble = null;
      }
    }

    else {
      userIcons.push(
        <Image source={graphics.get('kehys_iso')} key={0} style={styles.userRow}>
          <Image source={require('../../../assets/default-icon.png')} style={styles.icon}/>
          <View>
            <Text style={styles.name}> Nimi </Text>
          </View>
        </Image>
      );

      rightcolumn = <View style={[styles.rightcolumn, {flexDirection: 'row'}]}>{userIcons}</View>;
      speechBubble = (
        <SpeechBubble
          text={'userIsUnknown'}
          bubbleType={graphics.get('puhekupla_aset')}
          style={{top: 20, left: 230, height: 200, width: 355, margin: 40}}/>
      );
    }

    if (this.state.isPasswordModalOpen === true) {
      var passwordModal = <PasswordModal onClose={this.closePasswordModal} onSuccess={this.openSettings}/>;
    }
    else {
      passwordModal = null;
    }

    return (
      <Image source={graphics.get('tausta_hemmolla')} style={styles.container}>
        <View style={styles.leftcolumn}>
          <View style={styles.settingsButton}>
            <TouchableHighlight onPress={this.openPasswordModal}>
              <Image
                source={graphics.get('nappula_aset')}
                style={{height: 40, width: 40}}/>
            </TouchableHighlight>
          </View>
        </View>

        {rightcolumn}
        {speechBubble}
        {passwordModal}
      </Image>
    );
  }
});

export default HomeView;
