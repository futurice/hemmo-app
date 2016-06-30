import * as NavigationState from '../../modules/navigation/NavigationState';
import * as HomeState from '../../modules/home/HomeState';
import React, {PropTypes} from 'react';
import {List, Map, immutable} from 'immutable';
import UserConfigurationButton from '../../components/UserConfigurationButton';

import {
  TouchableOpacity,
  ListView,
  Image,
  Text,
  View
} from 'react-native';

var styles = require('./styles.js');
var userIcons;
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => !immutable.is(r1,r2)});

const HomeView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List),
    viewUserProfile: PropTypes.func.isRequired,
    currentUser: PropTypes.instanceOf(Map)
  },
  getInitialState() {
    return {
      dataSource: ds.cloneWithRows(this.props.users.toArray())
    };
  },
  addUser() {
    this.props.dispatch(HomeState.resetCurrentUser());
    this.props.dispatch(NavigationState.pushRoute({key: 'Settings'}));
  },
  render() {
    if (this.props.users.size > 0) {
      userIcons = <ListView
        dataSource = {ds.cloneWithRows(this.props.users.toArray())}
        renderRow = {
          (rowData) =>
            <View style={styles.userRow}>
              <UserConfigurationButton
                id={rowData.get('id')}
                viewUserProfile={this.props.viewUserProfile}
              />
              <Image style={styles.icon} source={{uri: rowData.get('image')}}/>

            </View>
        }
      />;
    }
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={this.addUser}
            style={[styles.settingsButton]}>
            <Text style={styles.button}>
              +
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.column}>
          {userIcons}
        </View>
      </View>
    );
  }
});

export default HomeView;
