import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import Button from '../../../components/Button';
import Hemmo from '../../../components/Hemmo';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as NavigationState from '../../../modules/navigation/NavigationState';

import {
  Text,
  TextInput,
  Alert,
  View
} from 'react-native';

var styles = require('../styles.js');
var activities = require('../../activity/activities.js');
var buttonPanel;

const Record = React.createClass({

  propTypes: {
    answers: PropTypes.instanceOf(Map),
    dispatch: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      enableWriting: false
    };
  },

  enableWriting() {
    this.setState({enableWriting: true});
  },

  disableWriting() {
    this.setState({enableWriting: false});
  },

  saveText() {
    this.props.dispatch(NavigationState.pushRoute({key: 'NewRound'}));
  },

  renderTitlePanel() {
    var i = this.props.answers.get('MainActivity');
    var j = this.props.answers.get('SubActivity');
    return (
      <View style={styles.titleRow}>
        <Text style={styles.mainTitle}>{activities[i].get('key')}</Text>
        <Text style={styles.subtitle}>{activities[i].get('subActivities').get(j)}</Text>
      </View>
    );
  },

  renderButtonPanel(icon, text, onPress) {
    var saveOrWriteButton = (<Button
      style={styles.writeButton} highlightStyle={styles.writeButtonHighlight}
      onPress={onPress} text={text} icon={icon}/>);

    var skipButton = (<Button
      style={styles.skipButton} highlightStyle={styles.skipButtonHighlight}
      onPress={this.enableWriting} text={'Ohita'} icon={'angle-right'}/>);

    return (
      <View style={styles.extraRow}>
        {saveOrWriteButton}
        {skipButton}
      </View>
    );
  },

  renderWritingPanel() {
    return (
      <View style={styles.writingContainer}>
        <View style={styles.textInput}>
          <TextInput
            multiline = {true}
            numberOfLines = {30}
            maxLength = {150}
            underlineColorAndroid = 'transparent'
            style={styles.textForm}/>
        </View>
        <Icon onPress={this.disableWriting} name='times-circle' size={40} style={styles.closeButton}/>
      </View>
    );
  },

  render() {

    var titlePanel = this.renderTitlePanel();
    var actionPanel = (
      <View style={styles.actionRow}>
        <Text>Recording voice</Text>
      </View>
    );

    if (this.state.enableWriting === true) {
      var writingView = this.renderWritingPanel();
      buttonPanel = this.renderButtonPanel('save', 'Tallenna', this.saveText);
    }
    else {
      buttonPanel = this.renderButtonPanel('pencil', 'Kirjoita', this.enableWriting);
    }
    return (
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          {titlePanel}
          {actionPanel}
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.hemmoRow}>
            <Hemmo x={40} y={40}/>
          </View>
          {buttonPanel}
        </View>
        {writingView}
      </View>
    );
  }
});

export default Record;