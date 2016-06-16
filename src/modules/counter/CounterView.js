import * as CounterState from './CounterState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';

const CounterView = React.createClass({
  propTypes: {
    counter: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired
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
          style={[styles.counterButton, loadingStyle]}>
          <Text style={styles.counter}>
            {this.props.counter}
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
  counterButton: {
    ...circle,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  counter: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    padding: 5
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  }
});

export default CounterView;
