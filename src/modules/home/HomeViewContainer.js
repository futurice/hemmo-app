import { resetCurrentUser, setCurrentUser, addActivity } from '../user/UserState';
import { startPreparing, finishPreparing } from '../session/SessionState';
import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import UserItem from '../../components/UserItem';
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
  pushRoute: route => dispatch(NavigationActions.navigate({ routeName: route })),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class HomeViewContainer extends Component {

  static propTypes = {
    resetCurrentUser: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    addActivity: PropTypes.func.isRequired,
    startPreparing: PropTypes.func.isRequired,
    finishPreparing: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List).isRequired,
    currentUser: PropTypes.instanceOf(Map).isRequired,
  };

  state = {
    isLoginModalOpen: false,
    showBubble: true,
  };

  openSettings = () => {
    this.props.resetCurrentUser();
    this.props.pushRoute('Settings');
  };

  startJourney = (id) => {
    this.props.startPreparing();

    setAuthenticationToken(this.props.users.get(id).get('token'))
      .then(() => {
        this.startSession(id);
      });
  };

  startSession = (id) => {
    post('/app/feedback')
      .then((result) => {
        setSessionId(result.id);
        this.props.finishPreparing();
        this.props.setCurrentUser(id);
        this.props.pushRoute('Feedback');
      })
      .catch((error) => {
        console.log(error);
        this.props.finishPreparing();
        Alert.alert('Oops! Jokin meni pieleen!', 'Yritä myöhemmin uudelleen!');
      });
  };

  renderLeftColumn = () => (
    <View style={styles.leftColumn}>
      <View style={styles.settingsButton}>
        <TouchableHighlight onPress={() => this.props.pushRoute('Login')}>
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

  renderUserName = name => (
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={styles.font}
    >{name}
    </Text>
    );

  render() {
    const users = this.props.users;

    return (
      <Image source={getImage('tausta_perus3')} style={styles.container}>
        {this.renderLeftColumn()}
        {this.renderRightColumn(users)}
      </Image>
    );
  }
}
