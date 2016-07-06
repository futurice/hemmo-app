import * as NavigationState from '../../modules/navigation/NavigationState';
import * as SettingsState from '../../modules/settings/SettingsState';
import * as HomeState from '../../modules/home/HomeState';
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
var speechBubble;
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => !immutable.is(r1,r2)});

var phrases = require('../../../phrases.json');

const HomeView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List),
    viewUserProfile: PropTypes.func.isRequired,
    currentUser: PropTypes.instanceOf(Map),
    shouldHide: PropTypes.bool.isRequired
  },
  getInitialState() {
    return {
      dataSource: ds.cloneWithRows(this.props.users.toArray())
    };
  },
  openSettings() {
    this.props.dispatch(SettingsState.resetCurrentUser());
    this.props.dispatch(NavigationState.pushRoute({key: 'Settings', index: 1}));
  },
  hideBubble() {
    this.props.dispatch(HomeState.hideBubble());
  },
  render() {
    if (this.props.users.size > 0) {
      // TODO: If there are more than 4 added children, only names of the children are displayed.
      userIcons = <ListView
        contentContainerStyle = {styles.list}
        dataSource = {ds.cloneWithRows(this.props.users.toArray())}
        renderRow = {
          (rowData) =>
            <View style={styles.userRow}>
              <Image style={styles.icon} source={{uri: rowData.get('image')}}/>
              <View style={styles.nameLabel}>
                <UserConfigurationButton
                  id={rowData.get('id')}
                  viewUserProfile={this.props.viewUserProfile}
                />
                <Text style={styles.name}> {rowData.get('name')} </Text>
              </View>
            </View>
        }
      />;
      speechBubble = <SpeechBubble text={phrases.userIsKnown}/>;
    }
    else {
      userIcons =
        <View style={styles.emptyRow}>
          <Image style={styles.icon} source={require('../../../assets/default-icon.png')}/>
          <View style={styles.nameLabel}>
            <Text style={styles.name}> Nimi </Text>
          </View>
        </View>;

      speechBubble = <SpeechBubble text={phrases.userIsUnknown}/>;
    }
    return (
      <View style={styles.container}>
        <View style={styles.leftcolumn}>

          <View style={styles.settingsButton}>
            <TouchableHighlight
              onPress={this.openSettings}>
              <Icon name='cog' size={40} style={styles.button}/>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.rightcolumn}>
          {userIcons}
        </View>
        {speechBubble}
        <Hemmo/>
      </View>
    );
  }
});

export default HomeView;
