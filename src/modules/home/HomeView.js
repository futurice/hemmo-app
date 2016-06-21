import * as HomeState from './HomeState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';

const HomeView = React.createClass({
  propTypes: {
    onNavigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  },

  settings() {
    this.props.dispatch(NavigationState.pushRoute({key: 'Settings'}));
  },

  render() {
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

    return (
      <View style={styles.container}>

        <TouchableOpacity
          onPress={this.settings}
          style={[styles.settingsButton, loadingStyle]}>
          <Text style={styles.button}>
            Settings
          </Text>
        </TouchableOpacity>



      </View>
    );
  }
});

const circle = {
  borderWidth: 0,
  borderRadius: 60,
  width: 120,
  height: 120
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  settingsButton: {
    ...circle,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  button: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default HomeView;
