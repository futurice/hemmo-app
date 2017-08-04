import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { NavigationActions } from 'react-navigation';
import {
  TouchableOpacity,
  Image,
  Dimensions,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import AppButton from '../components/AppButton';
import { getImage } from '../services/graphics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioRecorder: {
    marginBottom: 70,
  },
  doneButton: {
    alignSelf: 'center',
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
      <Image source={getImage('tausta_perus3').normal} style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          overScrollMode={'always'}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.buttonContainer}>
            {this.renderRecordButton()}
            {this.renderWriteButton()}
          </View>
        </ScrollView>
        <View style={styles.doneButton}>
          {this.renderDoneButton()}
        </View>
      </Image>
    );
  }
}
