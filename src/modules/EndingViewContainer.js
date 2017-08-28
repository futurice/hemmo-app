import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import * as Animatable from 'react-native-animatable';

import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import { resetCurrentUser } from '../state/UserState';
import { getImage, getSizeByWidth, getFontSize } from '../services/graphics';
import AppButton from '../components/AppButton';

const activities = require('../data/activities');
const moods = require('../data/moods');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null,
    flexDirection: 'column',
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: getFontSize(3),
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
  freeWord: state.getIn(['user', 'currentUser', 'answers', 'freeWord']),
});

const mapDispatchToProps = dispatch => ({
  reset: () => {
    dispatch(resetCurrentUser());
  },
  startAgain: () => {
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
    headerTitleStyle: styles.headerTitle,
    headerStyle: { height: getFontSize(8) },
  };

  static propTypes = {
    startAgain: PropTypes.func.isRequired,
  };

  envelopePos = {
    left: new Animated.Value(0),
    bottom: new Animated.Value(0),
  };
  envelopeScale = new Animated.Value(1);
  envelopeFillAnim = {
    bottom: new Animated.Value(0),
  };
  activityAnimatables = [];
  moodAnimatables = [];
  freeWordAnimatables = [];
  selectedActivities = [];
  selectedSubActivities = [];
  selectedMoods = [];
  selectedFreeWord = [];
  envelopeSend = {
    duration: 700,
    delay: 2300,
  };
  showStartAgain = new Animated.Value(0);

  componentWillMount() {
    // Gather feedback data and reset user after that
    this.parseFeedback();
    this.props.reset();
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.envelopeFillAnim.bottom, {
        toValue: 1,
        duration: 0,
        delay: 2000,
      }),
    ]).start();

    // Animation for "sending" the envelope
    Animated.parallel([
      Animated.timing(this.envelopePos.left, {
        toValue: 1,
        duration: this.envelopeSend.duration,
        delay: this.envelopeSend.delay,
      }),
      Animated.timing(this.envelopePos.bottom, {
        toValue: 1,
        duration: this.envelopeSend.duration,
        delay: this.envelopeSend.delay,
      }),
      Animated.timing(this.envelopeScale, {
        toValue: 0.2,
        duration: this.envelopeSend.duration,
        delay: this.envelopeSend.delay,
      }),
    ]).start();

    Animated.timing(this.showStartAgain, {
      toValue: 1,
      duration: 0,
      delay: this.envelopeSend.delay + this.envelopeSend.duration,
    }).start();

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
          translateY: 0.7 * Dimensions.get('window').height,
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
            Dimensions.get('window').height * 0.3 +
            Math.sin(-Math.PI * ((index + 0.5) / array.length)) *
              Dimensions.get('window').height *
              0.04,
        },
        // End positions
        {
          translateX: 0,
          translateY: 0.7 * Dimensions.get('window').height,
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
          translateY: 0.7 * Dimensions.get('window').height,
        },
      ),
    );
  }

  parseFeedback = () => {
    this.props.selectedActivities.entrySeq().forEach(mainActivity => {
      const main = mainActivity[0];

      mainActivity[1].entrySeq().forEach(subActivity => {
        const sub = subActivity[0];
        const like = subActivity[1];

        this.selectedActivities.push({ main, sub, like });
        this.selectedSubActivities.push(sub);
      });
    });

    this.selectedMoods = this.props.selectedMoods.toJS();
    this.selectedFreeWord = this.props.freeWord.toJS();
  };

  drawBlob = (
    asset,
    index,
    total,
    animatableArray,
    baseDelay,
    customDelay = 300,
  ) => {
    const size = Math.min(
      Dimensions.get('window').width * 0.2,
      Dimensions.get('window').width * (1 / total),
    );

    const cumulativeDelay = customDelay ? index * customDelay : 0;

    return (
      <Animatable.View
        useNativeDriver
        easing="ease-in-out-cubic"
        duration={800}
        delay={baseDelay + cumulativeDelay}
        key={index}
        style={{
          zIndex: 500,
          alignItems: 'center',
          position: 'absolute',
        }}
        ref={animatable => animatableArray.push(animatable)}
      >
        <Image
          style={{
            zIndex: 500,
            width: size,
            height: size,
            resizeMode: 'contain',
          }}
          source={asset}
        />
      </Animatable.View>
    );
  };

  drawMoods = () => {
    const bottom = this.envelopeFillAnim.bottom.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '-100%'],
    });

    return (
      <Animated.View style={{ alignItems: 'center', bottom }}>
        {moods.map((mood, index) => {
          return this.selectedMoods.includes(mood.get('name'))
            ? this.drawBlob(
                getImage(mood.get('key')).shadow,
                index,
                this.selectedMoods.length,
                this.moodAnimatables,
                500,
                100,
              )
            : null;
        })}
      </Animated.View>
    );
  };

  drawActivities = () => {
    let numActivity = 0;
    const numActivities = this.selectedSubActivities.length;

    const bottom = this.envelopeFillAnim.bottom.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '-100%'],
    });

    return (
      <Animated.View style={{ alignItems: 'center', bottom }}>
        {activities.map(activity => {
          const subActivities = activity.get('subActivities');

          return subActivities
            ? activity.get('subActivities').map(subActivity => {
                return this.selectedSubActivities.includes(
                  subActivity.get('name'),
                )
                  ? this.drawBlob(
                      getImage(subActivity.get('key')).shadow,
                      numActivity++,
                      numActivities,
                      this.activityAnimatables,
                      1000,
                      0,
                    )
                  : null;
              })
            : null;
        })}
      </Animated.View>
    );
  };

  drawFreeWord = () => {
    const renderAudio = this.selectedFreeWord.some(
      item => item.type === 'audio',
    );
    const renderWrite = this.selectedFreeWord.some(
      item => item.type === 'text',
    );

    const bottom = this.envelopeFillAnim.bottom.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '-100%'],
    });

    return (
      <Animated.View style={{ alignItems: 'center', bottom }}>
        {renderAudio
          ? this.drawBlob(
              getImage('record_round').normal,
              0,
              2,
              this.freeWordAnimatables,
              250,
              0,
            )
          : null}
        {renderWrite
          ? this.drawBlob(
              getImage('write_round').normal,
              1,
              2,
              this.freeWordAnimatables,
              250,
              0,
            )
          : null}
      </Animated.View>
    );
  };

  drawEnvelopeBackground = () => {
    const bottom = this.envelopeFillAnim.bottom.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '-100%'],
    });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          alignItems: 'center',
          bottom,
          left: '50%',
        }}
      >
        <Image
          source={getImage('background_withstroke').normal}
          style={{
            zIndex: 0,
            position: 'absolute',
            bottom: 0,
            width: getSizeByWidth('background_withstroke', 0.8).width,
          }}
          resizeMode="contain"
        />
        <Image
          source={getImage('without_flap_small').normal}
          style={{
            zIndex: 1000,
            position: 'absolute',
            bottom: 0,
            width: getSizeByWidth('without_flap_small', 0.8).width,
          }}
          resizeMode="contain"
        />
      </Animated.View>
    );
  };

  drawEnvelopeForeground = () => {
    const bottom = this.envelopeFillAnim.bottom.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '-100%'],
    });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 1000,
          bottom,
          width: Dimensions.get('window').width * 0.8,
          alignSelf: 'center',
        }}
      >
        <Animated.Image
          source={getImage('without_flap_small').normal}
          style={{
            position: 'absolute',
            zIndex: 1000,
            bottom: 0,
            width: getSizeByWidth('without_flap_small', 0.8).width,
          }}
          resizeMode="contain"
        />
      </Animated.View>
    );
  };

  sendEnvelope = () => {
    const bottom = this.envelopePos.bottom.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '200%'],
    });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          alignItems: 'center',
          alignSelf: 'center',
          bottom,
          transform: [{ scale: this.envelopeScale }],
        }}
      >
        <Animated.Image
          source={getImage('envelope_closed_ending_screen').normal}
          resizeMode="contain"
          style={{
            width: getSizeByWidth('envelope_closed_ending_screen', 0.8).width,
          }}
        />
      </Animated.View>
    );
  };

  drawStartAgain = () =>
    <TouchableOpacity>
      <Animated.View
        style={{
          alignItems: 'center',
          top: '43%',
          height: '100%',
          opacity: this.showStartAgain,
        }}
      >
        <AppButton
          background="start_again"
          onPress={this.props.startAgain}
          width={getSizeByWidth('start_again', 0.8).width}
          shadow
        />
      </Animated.View>
    </TouchableOpacity>;

  render() {
    return (
      <Image source={getImage('forest').normal} style={styles.container}>
        {this.sendEnvelope()}
        {this.drawEnvelopeBackground()}
        {this.drawEnvelopeForeground()}
        {this.drawActivities()}
        {this.drawMoods()}
        {this.drawFreeWord()}
        {this.drawStartAgain()}
      </Image>
    );
  }
}
