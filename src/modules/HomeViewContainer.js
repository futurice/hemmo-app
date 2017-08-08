import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  Alert,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import UserItem from '../components/UserItem';
import AppButton from '../components/AppButton';
import {
  resetCurrentUser,
  setCurrentUser,
  addActivity,
} from '../state/UserState';
import { startPreparing, finishPreparing } from '../state/SessionState';
import { setAuthenticationToken } from '../utils/authentication';
import { setSessionId } from '../utils/session';
import { post } from '../utils/api';
import {
  getSizeByHeight,
  getSizeByWidth,
  getImage,
} from '../services/graphics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null,
    backgroundColor: '#FFFFFF',
  },
  userContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  firstUseContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  settingsButton: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
    left: 20,
    bottom: 20,
  },
  bubbleText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'ComicNeue-Bold',
    color: '#000',
    fontSize: 14,
    margin: 16,
  },
  hemmo: {
    alignSelf: 'center',
  },
  bubbleTextTitle: {
    fontSize: 16,
    margin: 5,
  },
  userName: {
    fontFamily: 'Roboto-Regular',
    color: '#000',
  },
});

const mapStateToProps = state => ({
  users: state.getIn(['user', 'users']),
  currentUser: state.getIn(['user', 'currentUser']),
});

const mapDispatchToProps = dispatch => ({
  resetCurrentUser: () => dispatch(resetCurrentUser()),
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  addActivity: () => dispatch(addActivity()),
  startPreparing: () => dispatch(startPreparing()),
  finishPreparing: () => dispatch(finishPreparing()),
  pushRoute: route =>
    dispatch(NavigationActions.navigate({ routeName: route })),
  resetRoute: route =>
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: route })],
      }),
    ),
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
    resetRoute: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List).isRequired,
    currentUser: PropTypes.instanceOf(Map).isRequired,
  };

  state = {
    isLoginModalOpen: false,
    showBubble: true,
    firstUseScreenIndex: 0,
  };

  openSettings = () => {
    this.props.pushRoute('Settings');
  };

  startSession = async user => {
    this.props.startPreparing();

    try {
      await setAuthenticationToken(user.get('token'));

      const result = await post('/app/feedback', { activities: [], moods: [] });

      setSessionId(result.id);

      this.props.finishPreparing();
      this.props.setCurrentUser(user);
      this.props.pushRoute('FeedbackMenu');
    } catch (error) {
      console.log(error);
      this.props.finishPreparing();
      Alert.alert('Oops! Jokin meni pieleen!', 'Yritä myöhemmin uudelleen!');
    }
  };

  renderSettingsButton = () =>
    <View style={styles.settingsButton}>
      <AppButton
        background="settings"
        onPress={() => this.props.pushRoute('Login')}
        width={getSizeByWidth('settings', 0.08).width}
      />
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
        startJourney={() => this.startSession(user)}
        image={user.get('image')}
      />,
    );

  renderEmptyIcon = () =>
    <UserItem name={this.renderUserName('Nimi')} key={0} index={0} empty />;

  renderUserName = name =>
    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.userName}>
      {name}
    </Text>;

  // Texts should be put into separate file at some point
  renderBubbleText = () => {
    if (this.state.firstUseScreenIndex === 0) {
      return (
        <View style={{ margin: 15 }}>
          <Text style={[styles.bubbleText, styles.bubbleTextTitle]}>
            Tervetuloa Hemmoon!
          </Text>
          <Text style={styles.bubbleText}>
            Ensimmäinen askel on käyttäjätilin luominen lapselle. Tämä vaatii
            PeLa:n työntekijän tunnukset.
          </Text>
        </View>
      );
    }

    return (
      <Text style={styles.bubbleText}>
        Luodaksesi tilin lapselle, paina alla olevaa nappia ja kirjaudu sisään.
      </Text>
    );
  };

  renderFirstUseScreens = () => {
    const firstScreen = this.state.firstUseScreenIndex === 0;

    return (
      <View>
        <View style={styles.bubble}>
          <AppButton
            background="bubble_down"
            onPress={() =>
              this.setState({
                firstUseScreenIndex: 1 - this.state.firstUseScreenIndex,
              })}
            contentContainerStyle={{ padding: 30 }}
            width={getSizeByWidth('bubble_down', 0.5).width}
          >
            {this.renderBubbleText()}
          </AppButton>
        </View>
        <Image
          source={getImage(firstScreen ? 'hemmo_big' : 'hemmo_down').normal}
          style={[
            styles.hemmo,
            getSizeByWidth(
              firstScreen ? 'hemmo_big' : 'hemmo_down',
              firstScreen ? 0.25 : 0.23,
            ),
          ]}
        />
      </View>
    );
  };

  render() {
    if (this.props.users.size === 0) {
      return (
        <Image source={getImage('forest').normal} style={styles.container}>
          <View style={styles.firstUseContainer}>
            {this.renderFirstUseScreens()}
          </View>
          {this.renderSettingsButton()}
        </Image>
      );
    }

    return (
      <Image source={getImage('forest').normal} style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          overScrollMode={'always'}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.userContainer}>
            {this.renderUsers(this.props.users)}
          </View>
        </ScrollView>
        {this.renderSettingsButton()}
      </Image>
    );
  }
}
