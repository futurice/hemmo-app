import { resetCurrentUser, setCurrentUser, addActivity } from '../user/UserState';
import { startPreparing, finishPreparing } from '../session/SessionState';
import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import SpeechBubble from '../../components/SpeechBubble';
import Hemmo from '../../components/Hemmo';
import UserItem from '../../components/UserItem';
import LoginModal from '../../components/LoginModal';
import { setAuthenticationToken } from '../../utils/authentication';
import { setSessionId } from '../../utils/session';
import { post } from '../../utils/api';
import { getSizeByHeight, getImage } from '../../services/graphics';
import {
  TouchableHighlight,
  Image,
  Dimensions,
  Alert,
  Text,
  View,
} from 'react-native';

const styles = require('./styles.js');

const mapStateToProps = state => ({
  users: state.getIn(['user', 'users']),
  currentUser: state.getIn(['user', 'currentUser']),
});

const mapDispatchToProps = dispatch => ({
  resetCurrentUser: () => dispatch(resetCurrentUser()),
  setCurrentUser: id => dispatch(setCurrentUser(id)),
  addActivity: () => dispatch(addActivity()),
  startPreparing: () => dispatch(startPreparing()),
  finishPreparing: () => dispatch(finishPreparing()),
  navigate: route => dispatch(NavigationActions.navigate({ routeName: route })),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class HomeViewContainer extends Component {

  static propTypes = {
    resetCurrentUser: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    addActivity: PropTypes.func.isRequired,
    startPreparing: PropTypes.func.isRequired,
    finishPreparing: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map),
  };

  state = {
    isLoginModalOpen: false,
    showBubble: true,
  };

  componentWillMount() {
    //this.props.resetCurrentUser();
  }

  openSettings = () => {
    this.toggleLoginModal();
    this.props.resetCurrentUser();
    this.props.navigate('Settings');
  };

  startJourney = (id) => {
    this.props.startPreparing();

    setAuthenticationToken(this.props.users.get(id).get('token'))
      .then(() => {
        this.startSession(id);
      });
  };

  startSession = (id) => {
    post('/session')
      .then((result) => {
        setSessionId(result.sessionId);
        this.props.finishPreparing();
        this.props.addActivity();
        this.props.setCurrentUser(id);
        this.props.navigate('Activity');
      })
      .catch((error) => {
        this.props.finishPreparing();
        Alert.alert('Oops! Jokin meni pieleen!', 'Yritä myöhemmin uudelleen!');
      });
  };

  toggleLoginModal = () => {
    this.setState({ isLoginModalOpen: !this.state.isLoginModalOpen });
  };

  hideBubble = () => {
    this.setState({ showBubble: false });
  };

  restartAudioAndText = () => {
    this.setState({ showBubble: true });
  };

  renderLeftColumn = () => (
    <View style={styles.leftColumn}>
      <Hemmo image={'hemmo_keski'} size={0.8} restartAudioAndText={this.restartAudioAndText} />
      <View style={styles.settingsButton}>
        <TouchableHighlight onPress={this.toggleLoginModal}>
          <Image
            source={getImage('nappula_aset')}
            style={getSizeByHeight('nappula_aset', 0.15)}
          />
        </TouchableHighlight>
      </View>
    </View>
    );

  renderRightColumn = users => (
    <View style={[styles.rightColumn, users.size <= 4 ? { flexDirection: 'row', flexWrap: 'wrap' } : null]}>
      {users.size > 0 ? this.renderUserIcons(users) : this.renderEmptyIcon()}
    </View>
    );

  renderUserIcons = users => users.map((user, key) =>
    (<UserItem
      key={key}
      name={this.renderUserName(user.get('name'))}
      index={key}
      empty={false}
      startJourney={this.startJourney}
      image={user.get('image')}
      isColumn={users.size > 4}
      iconHeight={Dimensions.get('window').height / users.size}
      rowHeight={((Dimensions.get('window').height / users.size) - 10) / Dimensions.get('window').height}
    />),
    );

  renderEmptyIcon = () => (
    <UserItem
      name={this.renderUserName('Nimi')}
      key={0}
      index={0}
      empty
    />
    );

  renderSpeechBubble = usersNotEmpty => this.state.showBubble ? (
    <SpeechBubble
      text={usersNotEmpty ? 'userIsKnown' : 'userIsUnknown'}
      hideBubble={this.hideBubble}
      bubbleType={usersNotEmpty ? 'puhekupla_vasen2' : 'puhekupla_aset'}
      style={usersNotEmpty ? { top: 40, left: 280, margin: 20, marginTop: 20, size: 0.6 }
          : { top: 40, left: 230, margin: 40, size: 0.5 }}
    />
    ) : null;

  renderUserName = name => (
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={styles.font}
    >{name}
    </Text>
    );

  renderLoginModal = () => this.state.isLoginModalOpen ? (
    <LoginModal onClose={this.toggleLoginModal} onSuccess={this.openSettings} />
    ) : null;

  render() {
    const users = this.props.users;

    return (
      <Image source={getImage('tausta_perus3')} style={styles.container}>
        {this.renderLeftColumn()}
        {this.renderRightColumn(users)}
        {this.renderSpeechBubble(users.size > 0)}
        {this.renderLoginModal()}
      </Image>
    );
  }
}
