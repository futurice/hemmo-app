import * as NavigationState from '../navigation/NavigationState';
import * as UserState from '../user/UserState';
import * as SessionState from '../session/SessionState';
import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import SpeechBubble from '../../components/SpeechBubble';
import Hemmo from '../../components/Hemmo';
import UserItem from '../../components/UserItem';
import LoginModal from '../../components/LoginModal';
import {setAuthenticationToken} from '../../utils/authentication';
import {setSessionId} from '../../utils/session';
import {post} from '../../utils/api';
import {getSizeByHeight, getImage} from '../../services/graphics';

import {
  TouchableHighlight,
  Image,
  Dimensions,
  Alert,
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
      isLoginModalOpen: false,
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
    setAuthenticationToken(this.props.users.get(id).get('token'))
      .then(() => {
        this.startSession(id);
      });
  },

  startSession(id) {
    post('/session')
      .then(result => {
        setSessionId(result.sessionId);
        this.props.dispatch(SessionState.finishPreparing());
        this.props.dispatch(UserState.addActivity());
        this.props.dispatch(UserState.setCurrentUser(id));
        this.props.dispatch(NavigationState.pushRoute({key: 'Activity', allowReturn: true}));
      })
      .catch((error) => {
        this.props.dispatch(SessionState.finishPreparing());
        Alert.alert('Oops! Jokin meni pieleen!', 'Yritä myöhemmin uudelleen!');
      });
  },

  toggleLoginModal() {
    this.setState({isLoginModalOpen: !this.state.isLoginModalOpen});
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  restartAudioAndText() {
    this.setState({showBubble: true});
  },

  render() {
    var userIcons = [];
    var loginModal = null;
    var speechBubble = null;

    if (this.props.users.size > 0) {
      for (var i = 0; i < this.props.users.size; i++) {

        var name = (
          <Text
            ellipsizeMode='tail'
            numberOfLines={1}
            style={styles.font}> {this.props.users.get(i).get('name')} </Text>
        );

        /* If app has more than 4 children in it, only names of the children are displayed */
        if (this.props.users.size > 4) {
          var iconHeight = Dimensions.get('window').height / this.props.users.size;
          var rowHeight = ((Dimensions.get('window').height / this.props.users.size) - 10) / Dimensions.get('window').height;
          userIcons.push(
            <TouchableHighlight
              style={[styles.rowWithSmallImageContainer]}
              key={i}
              onPress={this.startJourney.bind(this, i)}>
              <Image
                source={getImage('kehys_palkki')}
                style={[styles.rowWithSmallImage, getSizeByHeight('kehys_palkki', rowHeight)]}>
                <Image
                  style={[styles.smallIcon, {height: iconHeight - 20, width: iconHeight - 20}]}
                  source={{uri: this.props.users.get(i).get('image')}}/>
                {name}
              </Image>
            </TouchableHighlight>
          );

          var rightcolumn = <View style={styles.rightcolumn}>{userIcons}</View>;
        }
        else {
          userIcons.push(
            <UserItem
              key={i}
              name={name}
              index={i}
              empty={false}
              startJourney={this.startJourney}
              image={this.props.users.get(i).get('image')}/>
          );

          rightcolumn = (
            <View style={[styles.rightcolumn, {flexDirection: 'row', flexWrap: 'wrap'}]}>
              {userIcons}
            </View>
          );
        }
      }

      if (this.state.showBubble === true) {
        speechBubble = (
          <SpeechBubble
            text={'userIsKnown'}
            hideBubble={this.hideBubble}
            bubbleType={'puhekupla_vasen2'}
            style={{top: 40, left: 280, margin: 20, marginTop: 20, size: 0.6}}/>
          );
      }
    }

    else {
      name = <Text style={styles.font}>Nimi</Text>;
      userIcons.push(
        <UserItem name={name} key={0} index={0} empty={true}/>
      );

      rightcolumn = <View style={[styles.rightcolumn, {flexDirection: 'row'}]}>{userIcons}</View>;

      if (this.state.showBubble === true) {
        speechBubble = (
        <SpeechBubble
          text={'userIsUnknown'}
          hideBubble={this.hideBubble}
          bubbleType={'puhekupla_aset'}
          style={{top: 40, left: 230, margin: 40, size: 0.5}}/>
        );
      }
    }

    if (this.state.isLoginModalOpen === true) {
      loginModal = <LoginModal onClose={this.toggleLoginModal} onSuccess={this.openSettings}/>;
    }

    return (
      <Image source={getImage('tausta_perus3')} style={styles.container}>
        <View style={styles.leftcolumn}>
          <Hemmo image={'hemmo_keski'} size={0.8} restartAudioAndText={this.restartAudioAndText}/>
          <View style={styles.settingsButton}>
            <TouchableHighlight onPress={this.toggleLoginModal}>
              <Image
                source={getImage('nappula_aset')}
                style={getSizeByHeight('nappula_aset', 0.15)}/>
            </TouchableHighlight>
          </View>
        </View>

        {rightcolumn}
        {speechBubble}
        {loginModal}
      </Image>
    );
  }
});

export default HomeView;
