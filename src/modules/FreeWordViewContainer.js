import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { NavigationActions } from 'react-navigation';
import {
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  Alert,
  View,
  StyleSheet,
} from 'react-native';
import AudioRecorder from '../components/AudioRecorder';
import LoadingSpinner from '../components/LoadingSpinner';
import SaveConfirmationWindow from '../components/SaveConfirmationWindow';
import { addFreeWord } from '../state/UserState';
import { setText, setAudio } from '../state/HemmoState';
import { getSessionId } from '../utils/session';
import { xhr } from '../utils/api';
import { getSizeByHeight, getImage } from '../services/graphics';

import AppButton from '../components/AppButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioRecorder: {
    marginBottom: 70,
  },
});

const phrases = require('../data/phrases.json');

const mapStateToProps = state => ({
  answers: state.getIn(['user', 'currentUser', 'answers']),
});

const mapDispatchToProps = dispatch => ({
  back: () => dispatch(NavigationActions.back()),
  pushRoute: key => dispatch(NavigationActions.navigate({ routeName: key })),
  popRoute: () => dispatch(NavigationActions.back()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class FreeWordViewContainer extends Component {
  static navigationOptions = {
    title: 'Kerro vapaasti',
  };

  static propTypes = {
    back: PropTypes.func.isRequired,
    popRoute: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired,
    answers: PropTypes.instanceOf(Map).isRequired,
  };

  state = {
    showSucceedingMessage: false,
  };

  renderSaveConfirmationWindow = () =>
    this.state.showSucceedingMessage
      ? <SaveConfirmationWindow closeWindow={this.props.back} />
      : null;

  renderRecordButton = () =>
    <View style={{ paddingVertical: 16 }}>
      <AppButton
        width={Dimensions.get('window').width * 0.9}
        onPress={() => this.props.pushRoute('Record')}
        background="record"
        shadow
      />
    </View>;

  renderWriteButton = () =>
    <View style={{ paddingVertical: 16 }}>
      <AppButton
        width={Dimensions.get('window').width * 0.9}
        onPress={() => this.props.pushRoute('Write')}
        background="write"
        shadow
      />
    </View>;

  renderDoneButton = () =>
    <TouchableOpacity onPress={this.props.back}>
      <Image
        source={require('./done.png')}
        style={{ width: 120, height: 60 }}
      />
    </TouchableOpacity>;

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {this.renderRecordButton()}
          {this.renderWriteButton()}
        </View>
        {this.renderDoneButton()}
      </View>
    );
  }
}
