import React, {PropTypes} from 'react';
import {List} from 'immutable';
import * as ActivityState from '../../modules/activity/ActivityState';

import {
  View,
  StyleSheet,
  Text
} from 'react-native';

const SubActivityView = React.createClass({

  propTypes: {
    subActivities: PropTypes.instanceOf(List),
    dispatch: PropTypes.func.isRequired
  },
  closeModal() {
    this.props.dispatch(ActivityState.closeSubActivities());
  },

  render() {

    console.log('Valitun kategorian alakategoriat ovat ' + JSON.stringify(this.props.subActivities));

    return (
      <View style={styles.container}>
        <Text>
          Hello taas {this.props.subActivities}
        </Text>
        <Text onPress={this.closeModal}> SULJE </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    opacity: 0.8,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    padding: 15,
    top: 10,
    left: 10,
    right: 10,
    bottom: 10
  }
});

export default SubActivityView;
