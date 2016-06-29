import * as NavigationState from '../../modules/navigation/NavigationState';
import * as HomeState from '../../modules/home/HomeState';
import React, {PropTypes} from 'react';
import {List, Map, immutable} from 'immutable';
import User from '../../components/User';

import {
  TouchableOpacity,
  ListView,
  Text,
  View
} from 'react-native';

var styles = require('./styles.js');
var users;
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => !immutable.is(r1,r2)});

const HomeView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    kids: PropTypes.instanceOf(List),
    viewUserProfile: PropTypes.func.isRequired,
    currentUser: PropTypes.instanceOf(Map)
  },
  getInitialState() {
    return {
      dataSource: ds.cloneWithRows(this.props.kids.toArray())
    };
  },
  componentDidMount() {
    this.getUsers();
  },
  getUsers() {
    this.setState({
      dataSource: ds.cloneWithRows(this.props.kids.toArray())
    });
  },
  addUser() {
    this.props.dispatch(HomeState.resetCurrentUser());
    this.props.dispatch(NavigationState.pushRoute({key: 'Settings'}));
  },
  render() {
    if (this.props.kids.size > 0) {
      console.log('Kids ei ollut tyhjä!');
      users = <ListView
        dataSource = {ds.cloneWithRows(this.props.kids.toArray())}
        renderRow = {
          (rowData) =>
            <User
              id={rowData.get('id')}
              image={rowData.get('image')}
              viewUserProfile={this.props.viewUserProfile}
            />
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
          {users}
        </View>
      </View>
    );
  }
});

export default HomeView;
