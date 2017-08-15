import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import { Image, Alert, Text, View, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import UserItem from '../components/UserItem';
import AppButton from '../components/AppButton';
import { setCurrentUser, setFeedbackId } from '../state/UserState';
import { startPreparing, finishPreparing } from '../state/SessionState';
import { setAuthenticationToken } from '../utils/authentication';
import { setText, setAudio } from '../state/HemmoState';
import { post } from '../utils/api';
import { getSizeByWidth, getImage } from '../services/graphics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null,
    backgroundColor: '#fff',
  },
  userContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  firstUseContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  settingsButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
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

const phrases = require('../data/phrases.json');

const mapStateToProps = state => ({
  users: state.getIn(['user', 'users']),
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setFeedbackId: id => dispatch(setFeedbackId(id)),
  startPreparing: () => dispatch(startPreparing()),
  finishPreparing: () => dispatch(finishPreparing()),
  setText: text => dispatch(setText(text)),
  setAudio: audio => dispatch(setAudio(audio)),
  pushRoute: route =>
    dispatch(NavigationActions.navigate({ routeName: route })),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class HomeViewContainer extends Component {
  static propTypes = {
    setCurrentUser: PropTypes.func.isRequired,
    setFeedbackId: PropTypes.func.isRequired,
    startPreparing: PropTypes.func.isRequired,
    finishPreparing: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List).isRequired,
  };

  state = {
    isLoginModalOpen: false,
    showBubble: true,
    firstUseScreenIndex: 0,
  };

  openLogin = () => {
    this.props.pushRoute('Login');
  };

  startSession = async user => {
    this.props.startPreparing();

    try {
      await setAuthenticationToken(user.get('token'));

      const result = await post('/app/feedback', { activities: [], moods: [] });

      this.props.finishPreparing();
      this.props.setCurrentUser(user);
      this.props.setFeedbackId(result.id);
      this.props.pushRoute('FeedbackMenu');
    } catch (error) {
      console.log(error);
      this.props.finishPreparing();

      await this.props.setAudio(phrases.check_connection.audio);
      Alert.alert('Hmm, jokin meni pieleen.', phrases.check_connection.text, [
        { text: 'OK', onPress: () => this.props.setAudio('') },
      ]);
    }
  };

  renderSettingsButton = () =>
    <View style={styles.settingsButton}>
      <AppButton
        background="settings"
        onPress={this.openLogin}
        width={getSizeByWidth('settings', 0.15).width}
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

  switchScreen = () => {
    this.setState({
      firstUseScreenIndex: 1 - this.state.firstUseScreenIndex,
    });
  };

  renderFirstUseScreens = () => {
    const firstScreen = this.state.firstUseScreenIndex === 0;

    return (
      <View>
        <View style={styles.bubble}>
          <AppButton
            background="bubble_down"
            onPress={this.switchScreen}
            contentContainerStyle={{ padding: 30 }}
            width={getSizeByWidth('bubble_down', 0.8).width}
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
              firstScreen ? 0.48 : 0.44,
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
