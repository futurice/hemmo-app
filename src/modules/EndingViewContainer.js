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
  Animated,
} from 'react-native';
import { resetCurrentUser } from '../state/UserState';
import { getImage, getSizeByHeight } from '../services/graphics';
import { patch } from '../utils/api';
import { getSessionId } from '../utils/session';
import AppButton from '../components/AppButton';
import { setText, setAudio } from '../state/HemmoState';
import { xhr } from '../utils/api';

const activities = require('../data/activities');
const moods = require('../data/moods');
const assets = require('../data/graphics');
const phrases = require('../data/phrases.json');

const letterAspectRatio = 202 / 312;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null,
    flexDirection: 'column',
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
  setText: text => dispatch(setText(text)),
  setAudio: audio => dispatch(setAudio(audio)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class EndingViewContainer extends Component {
  static navigationOptions = {
    title: 'Valmis',
  };

  static propTypes = {
    reset: PropTypes.func.isRequired,
    startAgain: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    setAudio: PropTypes.func.isRequired,
  };

  envelopePos = {
    left: new Animated.Value(0),
    bottom: new Animated.Value(0),
  };
  envelopeScale = new Animated.Value(1);
  envelopeFillAnim = {
    scaleY: new Animated.Value(0),
    zIndex: new Animated.Value(0),
    bottom: new Animated.Value(0),
  };
  activityAnimatables = [];
  moodAnimatables = [];
  freeWordAnimatables = [];
  selectedActivities = [];
  selectedSubActivities = [];
  selectedMoods = [];
  envelopeSend = {
    duration: 700,
    delay: 2300,
  };
  showStartAgain = new Animated.Value(0);

  componentWillMount() {
    // Gather feedback data
    this.parseFeedback();
  }

  componentDidMount() {
    // Send data to server
    this.sendFeedback();

    // Animation for closing lid
    Animated.parallel([
      Animated.timing(this.envelopeFillAnim.scaleY, {
        toValue: 1,
        duration: 500,
        delay: 2000,
      }),
      Animated.timing(this.envelopeFillAnim.zIndex, {
        toValue: 1,
        duration: 0,
        delay: 2000,
      }),
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
            Dimensions.get('window').width * 0.3 +
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

  getRequestBody = () => {
    let data = {};

    if (this.selectedActivities.length) {
      data.activities = this.selectedActivities;
    }

    if (this.selectedMoods.length) {
      data.moods = this.selectedMoods;
    }

    return data;
  };

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
  };

  sendFeedback = async () => {
    const feedbackId = await getSessionId();
    const requestBody = this.getRequestBody();

    try {
      await patch(`/app/feedback/${feedbackId}`, this.getRequestBody());

      this.props.freeWord.map(async item => {
        const type = item.keys().next().value;
        const content = item.values().next().value;
        let attachmentBody = new FormData();

        if (type === 'audio') {
          let file = {
            uri: `file://${content}`,
            type: 'audio/mp4',
            name: 'file',
          };

          attachmentBody.append('data', file);
        } else {
          attachmentBody.append('data', content);
        }

        await xhr(
          'POST',
          `/app/feedback/${feedbackId}/attachments`,
          attachmentBody,
        );
      });

      // Reset status once everything has been sent
      this.props.reset();
    } catch (error) {
      console.log(error);
      Alert.alert('Oops! Jokin meni pieleen!', 'Yritä myöhemmin uudelleen!');
    }
  };

  drawActivities = () => {};

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
      Dimensions.get('window').width * 0.7 * (1 / total),
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
                assets[mood.get('key')].shadow,
                index,
                moods.length,
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
                      assets[subActivity.get('key')].shadow,
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
    let renderAudio = false;
    let renderWrite = false;

    const bottom = this.envelopeFillAnim.bottom.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '-100%'],
    });

    this.props.freeWord.map(async item => {
      const type = item.keys().next().value;

      if (type === 'audio') {
        renderAudio = true;
      } else if (type === 'text') {
        renderWrite = true;
      }
    });

    return (
      <Animated.View style={{ alignItems: 'center', bottom }}>
        {renderAudio
          ? this.drawBlob(
              assets['record_round'].normal,
              0,
              2,
              this.freeWordAnimatables,
              250,
              0,
            )
          : null}
        {renderWrite
          ? this.drawBlob(
              assets['write_round'].normal,
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

  drawEnvelope = () => {
    const scaleY = this.envelopeFillAnim.scaleY.interpolate({
      inputRange: [0, 1],
      outputRange: [1, -1],
    });

    const zIndex = this.envelopeFillAnim.zIndex.interpolate({
      inputRange: [0, 1],
      outputRange: [400, 9999],
    });

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
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            bottom: 0,
            left: '50%',
          }}
        >
          <Image
            source={require('../../assets/graphics/others/background_withstroke.png')}
            style={{
              zIndex: 0,
              position: 'absolute',
              bottom: 0,
              width: Dimensions.get('window').width * 0.8,
            }}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/graphics/others/without_flap_small_s2dp.png')}
            style={{
              zIndex: 1000,
              position: 'absolute',
              bottom: 0,
              width: Dimensions.get('window').width * 0.8,
            }}
            resizeMode="contain"
          />
          <Animated.View
            style={{
              alignItems: 'center',
              position: 'absolute',
              bottom:
                Dimensions.get('window').width *
                0.8 *
                letterAspectRatio *
                0.278,
              width: Dimensions.get('window').width * 1,
              transform: [{ scaleY }],
              zIndex,
            }}
          >
            <Animated.Image
              source={require('../../assets/graphics/others/flap_nostroke.png')}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
      </Animated.View>
    );
  };

  sendEnvelope = () => {
    const left = this.envelopePos.left.interpolate({
      inputRange: [0, 1],
      outputRange: ['10%', '55%'],
    });

    const bottom = this.envelopePos.bottom.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '120%'],
    });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          alignItems: 'center',
          bottom,
          left,
          transform: [{ scale: this.envelopeScale }],
        }}
      >
        <Animated.Image
          source={require('../../assets/graphics/others/envelope_closed_ending-screen.png')}
          resizeMode="contain"
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
          width={getSizeByHeight('start_again', 0.75).height}
        />
      </Animated.View>
    </TouchableOpacity>;

  render() {
    return (
      <Image source={getImage('tausta_perus3').normal} style={styles.container}>
        {this.sendEnvelope()}
        {this.drawEnvelope()}
        {this.drawActivities()}
        {this.drawMoods()}
        {this.drawFreeWord()}
        {this.drawStartAgain()}
      </Image>
    );
  }
}
