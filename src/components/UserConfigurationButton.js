import React, {PropTypes} from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserConfigurationButton = React.createClass({

  propTypes: {
    userIndex: PropTypes.number.isRequired,
    viewUserProfile: PropTypes.func.isRequired
  },

  viewUserProfile() {
    this.props.viewUserProfile(this.props.userIndex);
  },

  render() {
    return (
      <View style={styles.button}>
        <TouchableHighlight
          onPress={this.viewUserProfile}>
          <Icon name='cog' size={30} style={styles.configIcon}/>
        </TouchableHighlight>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  button: {
    margin: 5
  },
  configIcon: {
    color: 'green'
  }
});

export default UserConfigurationButton;
