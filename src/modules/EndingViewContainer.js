import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Alert,
} from 'react-native';
import { resetCurrentUser } from '../state/UserState';
import { getImage, getSizeByHeight } from '../services/graphics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  sendButtonText: {
    fontSize: 30,
    color: '#1E90FF',
  },
});

const mapDispatchToProps = dispatch => ({
  resetCurrentUser: () => dispatch(resetCurrentUser()),

  // welp this should really use .reset(), but couldn't get it work for proto
  resetRoute: () => dispatch(NavigationActions.back()),
  /*
  resetRoute: () => dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Home' }),
    ],
  })),
  */
});

@connect(null, mapDispatchToProps)
export default class EndingViewContainer extends Component {

  static navigationOptions = {
    title: 'Valmis',
    tabBarIcon: <Image
      source={require('./icon_send.png')}
      style={{ width: 64, height: 64 }}
    />,
  };

  static propTypes = {
    resetRoute: PropTypes.func.isRequired,
    resetCurrentUser: PropTypes.func.isRequired,
  };

  end = () => {
    Alert.alert(
      'Kiitos palautteesta!',
      'Kiitos että kerroit. :)',
      [
        { text: 'OK', onPress: this.props.resetRoute },
      ],
      { cancelable: false },
    );
    this.props.resetCurrentUser();
    // this.props.resetRoute();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.end}
          style={styles.sendButton}
        >
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('./icon_send.png')}
              style={{ width: 64, height: 64 }}
            />
            <Text style={styles.sendButtonText}>Lähetä</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
