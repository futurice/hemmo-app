import * as HomeState from './HomeState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {Map, List} from 'immutable';

import {
  TouchableOpacity,
  ListView,
  Text,
  View
} from 'react-native';

var styles = require('./styles.js');

const HomeView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    kids: PropTypes.instanceOf(List)
  },
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.kids)
    };
  },
  settings() {
    this.props.dispatch(NavigationState.pushRoute({key: 'Settings'}));
  },

  render() {

    console.log('KIDS  ' + this.props.kids);

    return (
      <View style={styles.container}>

        <View style={styles.leftColumn}>
          <TouchableOpacity
            onPress={this.settings}
            style={[styles.settingsButton]}>
            <Text style={styles.button}>
              +
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rightColumn}>
          <ListView
           dataSource={this.state.dataSource}
           renderRow={(rowData) => <Text style={styles.nameList}>{rowData}</Text>}
           />
        </View>

      </View>
    );
  }
});

export default HomeView;
