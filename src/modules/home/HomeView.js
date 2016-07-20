import * as NavigationState from '../../modules/navigation/NavigationState';
import * as UserState from '../../modules/user/UserState';
import React, {PropTypes} from 'react';
import {List, Map, immutable} from 'immutable';
import UserConfigurationButton from '../../components/UserConfigurationButton';
import SpeechBubble from '../../components/SpeechBubble';
import Hemmo from '../../components/Hemmo';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  TouchableHighlight,
  ListView,
  Image,
  Text,
  View
} from 'react-native';

var styles = require('./styles.js');
var userIcons;
var bubbleText;
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => !immutable.is(r1,r2)});

const HomeView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map)
  },

  getInitialState() {
    return {
      dataSource: ds.cloneWithRows(this.props.users.toArray())
    };
  },

  openSettings() {
    this.props.dispatch(UserState.resetCurrentUser());
    this.props.dispatch(NavigationState.pushRoute({key: 'Settings', allowReturn: true}));
  },

  startJourney(id) {
    this.props.dispatch(UserState.setCurrentUser(id));
    this.props.dispatch(UserState.addActivity());
    this.props.dispatch(NavigationState.pushRoute({key: 'Activity', allowReturn: true}));
  },

  viewUserProfile(userIndex) {
    this.props.dispatch(UserState.setCurrentUser(userIndex));
    this.props.dispatch(NavigationState.pushRoute({key: 'Settings', allowReturn: true}));
  },

  render() {
    if (this.props.users.size > 0) {
      // TODO: If there are more than 4 added children, only names of the children are displayed.
      userIcons = (
        <ListView
        contentContainerStyle = {styles.list}
        dataSource = {ds.cloneWithRows(this.props.users.toArray())}
        renderRow = {
          (rowData) =>
            <View style={styles.userRow}>
              <View>
                <TouchableHighlight
                  onPress={this.startJourney.bind(this, rowData.get('id'))}>
                  <Image style={styles.icon} source={{uri: rowData.get('image')}}/>
                </TouchableHighlight>
              </View>
              <View style={styles.nameLabel}>
                <UserConfigurationButton
                  userIndex={rowData.get('id')}
                  viewUserProfile={this.viewUserProfile}
                />
                <Text style={styles.name}> {rowData.get('name')} </Text>
              </View>
            </View>
        }
      />);
      bubbleText = 'userIsKnown';
    }
    else {
      userIcons = (
        <View style={styles.emptyRow}>
          <Image style={styles.icon} source={require('../../../assets/default-icon.png')}/>
          <View style={styles.nameLabel}>
            <Text style={styles.name}> Nimi </Text>
          </View>
        </View>);

      bubbleText = 'userIsUnknown';
    }

    var speechBubble = <SpeechBubble text={bubbleText} position={{x: 20, y: 100, triangle: 70}}/>;

    return (
      <View style={styles.container}>
        <View style={styles.leftcolumn}>

          <View style={styles.settingsButton}>
            <TouchableHighlight
              onPress={this.openSettings}>
              <Icon name='cog' size={40} style={styles.button}/>
            </TouchableHighlight>
          </View>

          <Hemmo x={120} y={120}/>
        </View>

        <View style={styles.rightcolumn}>
          {userIcons}
        </View>
        {speechBubble}
      </View>
    );
  }
});

export default HomeView;
