import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {List, immutable} from 'immutable';
import User from '../../components/User';

import {
  TouchableOpacity,
  ListView,
  Text,
  View
} from 'react-native';

var styles = require('./styles.js');
var users;


const HomeView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    kids: PropTypes.instanceOf(List)
  },
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => !immutable.is(r1,r2)});
    return {
      dataSource: ds.cloneWithRows(this.props.kids.toArray())
    };
  },
  settings() {
    this.props.dispatch(NavigationState.pushRoute({key: 'Settings'}));
  },

  render() {

    console.log('KIDS  ' + this.props.kids);

    if (this.props.kids.size < 1)
    {
      console.log('Oli tyhjä');
    }
    else {
      console.log('Ei ollut tyhjä!');
      users = <ListView
        dataSource = {this.state.dataSource}
        renderRow = {
          (rowData) => <User image={rowData.get('image')}/>
        }
      />;
    }

    return (
      <View style={styles.container}>

        <View style={styles.column}>
          <TouchableOpacity
            onPress={this.settings}
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
