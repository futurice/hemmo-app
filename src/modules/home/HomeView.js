import * as NavigationState from '../navigation/NavigationState';
import * as UserState from '../user/UserState';
import * as SessionState from '../session/SessionState';
import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import SpeechBubbleView from '../../components/SpeechBubbleView';
import Hemmo from '../../components/Hemmo';
import PasswordModal from '../../components/PasswordModal';
import {setAuthenticationToken} from '../../utils/authentication';
import {setSessionId} from '../../utils/session';
import {post} from '../../utils/api';
import {getSize, getImage} from '../../services/graphics';

import {
  TouchableHighlight,
  Image,
  Dimensions,
  Text,
  View
} from 'react-native';

var styles = require('./styles.js');

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

  componentWillMount() {
    this.props.dispatch(UserState.resetCurrentUser());
  },

  openSettings() {
    this.props.dispatch(UserState.resetCurrentUser());
    this.props.dispatch(NavigationState.pushRoute({key: 'Settings', allowReturn: true}));
  },

  startJourney(id) {
    this.props.dispatch(SessionState.startPreparing());
    console.log('id ' + id);

    this.props.dispatch(UserState.setCurrentUser(id))
      .then(
        () => {
          console.log('this.props.currentUser ' + JSON.stringify(this.props.users.get(id).get('token')));
          setAuthenticationToken(this.props.users.get(id).get('token'))
        .then(() => {
          this.startSession();
          console.log('started session');
          this.props.dispatch(UserState.addActivity());
          this.props.dispatch(NavigationState.pushRoute({key: 'Activity', allowReturn: true}));
        });}
      );
  },

  startSession() {
    post('/session')
      .then(result => {
        setSessionId(result.sessionId);
        this.props.dispatch(SessionState.finishPreparing());
      });
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

  restartAudioAndText() {
    this.setState({showBubble: true});
  },

  // TODO: Clean up. Too much repetition atm.
  render() {
    var userIcons = [];

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
          var iconHeight = Dimensions.get('window').height / this.props.users.size;
          var rowHeight = ((Dimensions.get('window').height / this.props.users.size) - 10) / Dimensions.get('window').height;
          userIcons.push(
            <TouchableHighlight
              style={[styles.rowWithSmallImageTouchable]}
              key={i}
              onPress={this.startJourney.bind(this, i)}>
              <Image
                source={getImage('kehys_palkki')}
                style={[styles.rowWithSmallImage, getSize('kehys_palkki', rowHeight)]}>
                <Image
                  style={[styles.smallIcon, {height: iconHeight - 20, width: iconHeight - 20}]}
                  source={{uri: this.props.users.get(i).get('image')}}/>
                <Text style={styles.name}> {name} </Text>
              </Image>
            </TouchableHighlight>
          );

          var rightcolumn = <View style={styles.rightcolumn}>{userIcons}</View>;
        }
        else {
          var iconSize = getSize('kehys_iso', 0.3).height;
          userIcons.push(
            <Image
              source={getImage('kehys_iso')}
              key={i}
              style={[styles.userRow, getSize('kehys_iso', 0.4)]}>
              <TouchableHighlight
                onPress={this.startJourney.bind(this, i)}>
                <Image
                  style={{height: iconSize, width: iconSize}}
                  source={{uri: this.props.users.get(i).get('image')}}/>
              </TouchableHighlight>
              <View style={{width: iconSize, alignItems: 'center'}}>
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
            bubbleType={'puhekupla_vasen2'}
            style={{top: 40, left: 280, margin: 20, marginTop: 20, size: 0.6}}/>
          );
      }
      else {
        speechBubble = null;
      }
    }

    else {
      iconSize = getSize('kehys_iso', 0.3).height;
      userIcons.push(
        <Image source={getImage('kehys_iso')} key={0} style={[styles.userRow, getSize('kehys_iso', 0.4)]}>
          <Image source={getImage('default_image')} style={{height: iconSize, width: iconSize}}/>
          <View>
            <Text style={styles.name}> Nimi </Text>
          </View>
        </Image>
      );

      rightcolumn = <View style={[styles.rightcolumn, {flexDirection: 'row'}]}>{userIcons}</View>;
      if (this.state.showBubble === true) {
        speechBubble = (
        <SpeechBubbleView
          text={'userIsUnknown'}
          hideBubble={this.hideBubble}
          bubbleType={'puhekupla_aset'}
          style={{top: 40, left: 230, margin: 40, size: 0.5}}/>
        );
      }
      else {
        speechBubble = null;
      }
    }

    if (this.state.isPasswordModalOpen === true) {
      var passwordModal = <PasswordModal onClose={this.closePasswordModal} onSuccess={this.openSettings}/>;
    }
    else {
      passwordModal = null;
    }

    return (
      <Image source={getImage('tausta_perus3')} style={styles.container}>
        <View style={styles.leftcolumn}>
          <Hemmo image={'hemmo_keski'} size={0.8} restartAudioAndText={this.restartAudioAndText}/>
          <View style={styles.settingsButton}>
            <TouchableHighlight onPress={this.openPasswordModal}>
              <Image
                source={getImage('nappula_aset')}
                style={getSize('nappula_aset', 0.15)}/>
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
