import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Hemmo from '../components/Hemmo';
import Button from '../components/Button';
import * as NavigationState from '../modules/navigation/NavigationState';
import * as UserState from '../modules/user/UserState';
import SpeechBubble from '../components/SpeechBubble';

import {
  StyleSheet,
  View
} from 'react-native';

const NewRound = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired
  },

  newRound() {
    this.props.dispatch(NavigationState.resetRoute());
    this.props.dispatch(UserState.addActivity());
    this.props.dispatch(NavigationState.pushRoute({key: 'Activity', allowReturn: false}));
  },

  continue() {
    this.props.dispatch(UserState.resetActivity());
    this.props.dispatch(NavigationState.pushRoute({key: 'Emotions', allowReturn: false}));
  },

  render() {
    var speechBubble = (
      <SpeechBubble
      text={"newRound"}
      bubbleType={require('../../assets/graphics/bubbles/puhekupla_vasen.png')}
      style={{x: 10, y: 100}}/>
    );

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <Button
            style={styles.button} highlightStyle={styles.buttonHighlight}
            onPress={this.newRound} text={'Takaisin'} icon={''}/>
        </View>
        <View style={styles.centercolumn}>
          <Hemmo x={10} y={80}/>
        </View>
        <View style={styles.column}>
          <Button
            style={styles.button} highlightStyle={styles.buttonHighlight}
            onPress={this.continue} text={'Jatka'} icon={''}/>
        </View>
        {speechBubble}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  column: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  centercolumn: {
    flex: 1
  },
  button: {
    height: 150,
    width: 150,
    borderRadius: 60,
    borderWidth: 1
  },
  buttonHighlight: {
    height: 150,
    width: 150,
    borderRadius: 60,
    justifyContent: 'center'
  }
});

export default connect()(NewRound);
