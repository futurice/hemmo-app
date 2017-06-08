import * as NavigationState from '../navigation/NavigationState';
import * as UserState from '../user/UserState';
import * as SessionState from '../session/SessionState';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
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

let styles = require('./styles.js');

const HomeViewContainer = React.createClass({

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

  renderLeftColumn() {
    return (
      <View style={styles.leftColumn}>
        <Hemmo image={'hemmo_keski'} size={0.8} restartAudioAndText={this.restartAudioAndText}/>
        <View style={styles.settingsButton}>
          <TouchableHighlight onPress={this.toggleLoginModal}>
            <Image
              source={getImage('nappula_aset')}
              style={getSizeByHeight('nappula_aset', 0.15)}/>
          </TouchableHighlight>
        </View>
      </View>
    );
  },

  renderRightColumn(users) {
    return (
      <View style={[styles.rightColumn, users.size <= 4 ? {flexDirection: 'row', flexWrap: 'wrap'} : null]}>
        {users.size > 0 ? this.renderUserIcons(users) : this.renderEmptyIcon()}
      </View>
    );
  },

  renderUserIcons(users) {
    return users.map((user, key) =>
      <UserItem
        key={key}
        name={this.renderUserName(user.get('name'))}
        index={key}
        empty={false}
        startJourney={this.startJourney}
        image={user.get('image')}
        isColumn={users.size > 4}
        iconHeight={Dimensions.get('window').height / users.size}
        rowHeight={((Dimensions.get('window').height / users.size) - 10) / Dimensions.get('window').height}
      />
    );
  },

  renderEmptyIcon() {
    return (
      <UserItem name={this.renderUserName('Nimi')} key={0} index={0} empty={true} />
    );
  },

  renderSpeechBubble(usersNotEmpty) {
    return (
      <SpeechBubble
        text={usersNotEmpty ? 'userIsKnown' : 'userIsUnknown'}
        hideBubble={this.hideBubble}
        bubbleType={usersNotEmpty ? 'puhekupla_vasen2' : 'puhekupla_aset'}
        style={usersNotEmpty ? {top: 40, left: 280, margin: 20, marginTop: 20, size: 0.6}
          : {top: 40, left: 230, margin: 40, size: 0.5}}
      />
    );
  },

  renderUserName(name) {
    return (
      <Text
        ellipsizeMode='tail'
        numberOfLines={1}
        style={styles.font}>{name}
      </Text>
    );
  },

  renderLoginModal() {
    return (
      <LoginModal onClose={this.toggleLoginModal} onSuccess={this.openSettings} />
    );
  },

  render() {
    let users = this.props.users;

    return (
      <Image source={getImage('tausta_perus3')} style={styles.container}>
        {this.renderLeftColumn()}
        {this.renderRightColumn(users)}
        {this.state.showBubble ? this.renderSpeechBubble(users.size > 0) : null}
        {this.state.isLoginModalOpen ? this.renderLoginModal() : null}
      </Image>
    );
  }
});

export default connect(
  state => ({
    users: state.getIn(['user', 'users']),
    currentUser: state.getIn(['user', 'currentUser'])
  })
)(HomeViewContainer);
