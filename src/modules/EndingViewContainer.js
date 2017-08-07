import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import * as Animatable from 'react-native-animatable';

import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  Image,
  Alert,
} from 'react-native';
import { resetCurrentUser } from '../state/UserState';
import { getImage, getSizeByHeight } from '../services/graphics';

const activities = require('../data/activities');
const moods = require('../data/moods');
const assets = require('../data/graphics');

Animatable.initializeRegistryWithDefinitions({
  letterLidAnimation: {
    0: {
      scaleY: 1,
    },
    1: {
      scaleY: -1,
    },
  },
  moodAnimation: {
    0: {
      translateX: 0,
      translateY: 0,
    },
    1: {
      translateX: 0,
      translateY: 0.75 * Dimensions.get('window').height,
    },
  },
});

const letterAspectRatio = 202 / 312;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  sendButton: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  sendButtonText: {
    fontSize: 30,
    color: '#1E90FF',
  },
});

const mapStateToProps = state => ({
  selectedActivities: state.getIn([
    'user',
    'currentUser',
    'answers',
    'activities',
  ]),
  selectedMoods: state.getIn(['user', 'currentUser', 'answers', 'moods']),
});

const mapDispatchToProps = dispatch => ({
  reset: () => {
    dispatch(resetCurrentUser());
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      }),
    );
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class EndingViewContainer extends Component {
  static navigationOptions = {
    title: 'Valmis',
  };

  static propTypes = {
    reset: PropTypes.func.isRequired,
  };

  activityAnimatables = [];
  moodAnimatables = [];
  freeWordAnimatables = [];

  componentDidMount() {
    // Animate activities
    this.activityAnimatables.forEach((animatable, index, array) =>
      animatable.transition(
        // Initial positions
        {
          translateX:
            (index - array.length / 2 + 0.5) *
            Dimensions.get('window').width *
            0.7 *
            (1 / array.length),
          translateY:
            Dimensions.get('window').width * 0.1 + // Add some padding from top of screen
            Math.sin(-Math.PI * ((index + 0.5) / array.length)) *
              Dimensions.get('window').width *
              0.04,
        },
        // End positions
        {
          translateX: 0,
          translateY: 0.75 * Dimensions.get('window').height,
        },
      ),
    );

    // Animate moods
    this.moodAnimatables.forEach((animatable, index, array) =>
      animatable.transition(
        // Initial positions
        {
          translateX:
            (index - array.length / 2 + 0.5) *
            Dimensions.get('window').width *
            0.7 *
            (1 / array.length),
          translateY:
            Dimensions.get('window').width * 0.3 +
            Math.sin(-Math.PI * ((index + 0.5) / array.length)) *
              Dimensions.get('window').width *
              0.04,
        },
        // End positions
        {
          translateX: 0,
          translateY: 0.75 * Dimensions.get('window').height,
        },
      ),
    );

    // Animate moods
    this.freeWordAnimatables.forEach((animatable, index, array) =>
      animatable.transition(
        // Initial positions
        {
          translateX:
            (index - array.length / 2 + 0.5) *
            Dimensions.get('window').width *
            0.7 *
            (1 / array.length),
          translateY:
            Dimensions.get('window').width * 0.5 +
            Math.sin(-Math.PI * ((index + 0.5) / array.length)) *
              Dimensions.get('window').width *
              0.04,
        },
        // End positions
        {
          translateX: 0,
          translateY: 0.75 * Dimensions.get('window').height,
        },
      ),
    );
  }

  end = () => {
    Alert.alert(
      'Kiitos palautteesta!',
      'Kiitos että kerroit. :)',
      [{ text: 'OK', onPress: this.props.reset }],
      { cancelable: false },
    );
  };

  drawActivities = () => {};

  drawBlob = (asset, index, total, animatableArray, baseDelay) => {
    const size = Math.min(
      Dimensions.get('window').width * 0.2,
      Dimensions.get('window').width * 0.7 * (1 / total),
    );

    return (
      <Animatable.View
        useNativeDriver
        easing="ease-in-out-cubic"
        duration={2000}
        delay={baseDelay + index * 300}
        key={index}
        style={{
          zIndex: 999,
          alignItems: 'center',
          position: 'absolute',
        }}
        ref={animatable => animatableArray.push(animatable)}
      >
        <Image
          style={{
            zIndex: 999,
            width: size,
            height: size,
            resizeMode: 'contain',
          }}
          source={asset}
        />
      </Animatable.View>
    );
  };

  drawMoods = () =>
    <View style={{ alignItems: 'center' }}>
      {moods.map((mood, index) =>
        this.drawBlob(
          assets[mood.get('key')].shadow,
          index,
          moods.length,
          this.moodAnimatables,
          2000,
        ),
      )}
    </View>;

  drawActivities = () => {
    let numActivity = 0;

    const numActivities = activities.reduce(
      (accumulator, activity) =>
        accumulator + activity.get('subActivities').size,
      0,
    );

    return (
      <View style={{ alignItems: 'center' }}>
        {activities.map(activity =>
          activity
            .get('subActivities')
            .map(subActivity =>
              this.drawBlob(
                assets[subActivity.get('key')].shadow,
                numActivity++,
                numActivities,
                this.activityAnimatables,
                3000,
              ),
            ),
        )}
      </View>
    );
  };

  drawFreeWord = () =>
    <View style={{ alignItems: 'center' }}>
      {this.drawBlob(
        assets['record_round'].normal,
        0,
        2,
        this.freeWordAnimatables,
        1000,
      )}
      {this.drawBlob(
        assets['write_round'].normal,
        1,
        2,
        this.freeWordAnimatables,
        1000,
      )}
    </View>;

  drawEnvelope = () => {
    return (
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          bottom: 0,
        }}
      >
        <Image
          source={require('../../assets/graphics/others/envelope_background.png')}
          style={{
            zIndex: -1000,
            position: 'absolute',
            bottom: 0,
            width: Dimensions.get('window').width * 0.8,
          }}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/graphics/others/envelope_open_s2dp.png')}
          style={{
            zIndex: 1000,
            position: 'absolute',
            bottom: 0,
            width: Dimensions.get('window').width * 0.8,
          }}
          resizeMode="contain"
        />
        <Animatable.View
          duration={1000}
          delay={1000}
          animation="letterLidAnimation"
          useNativeDriver
          style={{
            zIndex: 900,
            alignItems: 'center',
            position: 'absolute',
            bottom:
              Dimensions.get('window').width * 0.8 * letterAspectRatio * 0.33,
            width: Dimensions.get('window').width * 0.8,
          }}
        >
          <Image
            style={{ zIndex: 900 }}
            source={require('../../assets/graphics/others/envelope_lid_s2dp.png')}
            resizeMode="contain"
          />
        </Animatable.View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.drawEnvelope()}
        {this.drawActivities()}
        {this.drawMoods()}
        {this.drawFreeWord()}
      </View>
    );
  }
}
