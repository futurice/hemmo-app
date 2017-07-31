import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import AppButton from '../../components/AppButton';
import { getSizeByHeight, getImage } from '../../services/graphics';

const phrases = require('../../data/phrases.json');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: null,
    width: null,
  },
  leftColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'center',
  },
  font: {
    fontSize: 20,
    fontFamily: 'Gill Sans',
  },
  settingsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});

const mapStateToProps = state => ({
  users: state.getIn(['user', 'users']),
  currentUser: state.getIn(['user', 'currentUser']),
  activitiesSize: state.getIn(['user', 'currentUser', 'answers', 'activities'])
    .size,
  moodsSize: state.getIn(['user', 'currentUser', 'answers', 'moods']).size,
  freeWordSize: state.getIn(['user', 'currentUser', 'answers', 'freeWord'])
    .size,
});

const mapDispatchToProps = dispatch => ({
  pushRoute: route =>
    dispatch(NavigationActions.navigate({ routeName: route })),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class HomeViewContainer extends Component {
  static navigationOptions = {
    title: 'Valikko',
  };

  renderBigButton = (background, onPress, done) =>
    <View style={{ paddingVertical: 16 }}>
      <AppButton
        width={Dimensions.get('window').width * 0.8}
        onPress={onPress}
        background={background}
        shadow
      >
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          {done
            ? <Image
                source={require('../../../assets/graphics/others/checkmark_big_s2dp.png')}
                style={{ width: 72, height: 72 }}
              />
            : null}
        </View>
      </AppButton>
    </View>;

  renderSendButton = (onPress, disabled) =>
    <View style={{ paddingTop: 32, paddingBottom: 16 }}>
      <AppButton
        width={Dimensions.get('window').width * 0.5}
        onPress={onPress}
        background="envelope_closed"
        disabled={disabled}
        shadow
      />
    </View>;

  render() {
    return (
      <Image source={getImage('tausta_perus3')} style={styles.container}>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 32, alignItems: 'center' }}
        >
          {this.renderBigButton(
            'whatdoned',
            () => this.props.pushRoute('Activity'),
            this.props.activitiesSize,
          )}
          {this.renderBigButton(
            'howfelt',
            () => this.props.pushRoute('Mood'),
            this.props.moodsSize,
          )}
          {this.renderBigButton(
            'tellfreely',
            () => this.props.pushRoute('FreeWord'),
            this.props.freeWordSize,
          )}

          {this.renderSendButton(
            () => this.props.pushRoute('Ending'),
            !this.props.activitiesSize ||
              !this.props.moodsSize ||
              !this.props.freeWordSize,
          )}
        </ScrollView>
      </Image>
    );
  }
}
