import {
  resetCurrentUser,
  setCurrentUser,
  addActivity,
} from '../state/UserState';
import { startPreparing, finishPreparing } from '../state/SessionState';
import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import UserItem from '../components/UserItem';
import { setAuthenticationToken } from '../utils/authentication';
import { setSessionId } from '../utils/session';
import { post } from '../utils/api';
import { getSizeByHeight, getImage } from '../services/graphics';
import {
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  settingsButton: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
    margin: 15,
  },
});

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
  pushRoute: route =>
    dispatch(NavigationActions.navigate({ routeName: route })),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class HomeViewContainer extends Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: '#FFFFFF' },
  };

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
    this.props.pushRoute('Settings');
  };

  startJourney = id => {
    this.props.startPreparing();

    setAuthenticationToken(this.props.users.get(id).get('token')).then(() => {
      this.startSession(id);
    });
  };

  startSession = id => {
    // Prototype version doesn't talk to API:
    this.props.resetCurrentUser();
    setSessionId('foobar');
    this.props.finishPreparing();
    this.props.setCurrentUser(id);
    this.props.pushRoute('Feedback');

    /*
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
    */
  };

  renderSettingsRow = () =>
    <View style={styles.settingsButton}>
      <TouchableOpacity onPress={() => this.props.pushRoute('Login')}>
        <Image
          source={getImage('nappula_aset')}
          style={getSizeByHeight('nappula_aset', 0.1)}
        />
      </TouchableOpacity>
    </View>;

  renderUsers = users =>
    users.size > 0 ? this.renderUserIcons(users) : this.renderEmptyIcon();

  renderUserIcons = users =>
    users.map((user, key) =>
      <UserItem
        key={key}
        name={this.renderUserName(user.get('name'))}
        index={key}
        empty={false}
        startJourney={this.startJourney}
        image={user.get('image')}
        iconHeight={Dimensions.get('window').height / users.size}
        rowHeight={
          (Dimensions.get('window').height / users.size - 10) /
          Dimensions.get('window').height
        }
      />,
    );

  renderEmptyIcon = () =>
    <UserItem name={this.renderUserName('Nimi')} key={0} index={0} empty />;

  renderUserName = name =>
    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.font}>
      {name}
    </Text>;

  render() {
    const users = this.props.users;

    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          overScrollMode={'always'}
          contentContainerStyle={styles.scrollContainer}
        >
          {this.renderUsers(users)}
        </ScrollView>
        {this.renderSettingsRow()}
      </View>
    );
  }
}
