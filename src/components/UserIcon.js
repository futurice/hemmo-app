import React, {PropTypes} from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  StyleSheet
} from 'react-native';

const UserIcon = React.createClass({

  // TODO: Could I pass the selectUser function some other (simpler) way?
  propTypes: {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    viewUserProfile: PropTypes.func.isRequired
  },

  viewUserProfile() {
    this.props.viewUserProfile(this.props.id);
  },

  render() {

    console.log('INDEX OLI ' + this.props.id);
    return (
      <View style={styles.userImage}>
        <TouchableHighlight
          onPress={this.viewUserProfile}>
          <Image style={styles.icon} source={{uri: this.props.image}}/>
        </TouchableHighlight>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  userImage: {
    alignItems: 'center',
    margin: 5
  },
  icon: {
    height: 50,
    width: 50
  }
});

export default UserIcon;
