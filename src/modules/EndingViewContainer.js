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
  resetRoute: () => dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Home' }),
    ],
  })),
});

@connect(null, mapDispatchToProps)
export default class EndingViewContainer extends Component {

  static navigationOptions = {
    title: 'Valmis',
    tabBarIcon: <Image
      source={getImage('valittu')}
      style={getSizeByHeight('valittu', 0.06)}
    />,
  };

  static propTypes = {
    resetRoute: PropTypes.func.isRequired,
    resetCurrentUser: PropTypes.func.isRequired,
  };

  end = () => {
    // this.props.resetCurrentUser();
    // this.props.resetRoute();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.end}
          style={styles.sendButton}
        >
          <Text style={styles.sendButtonText}>Lähetä</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
