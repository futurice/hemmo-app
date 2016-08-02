import * as NavigationState from '../../modules/navigation/NavigationState';
import * as UserState from '../../modules/user/UserState';
import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import SpeechBubble from '../../components/SpeechBubble';
import SpeechBubbleView from '../../components/SpeechBubbleView';
import PasswordModal from '../../components/PasswordModal';

import {
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';

var styles = require('./styles.js');

const HomeView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map)
  },

  getInitialState() {
    return {
      isPasswordModalOpen: false,
      showBubble: true
    };
  },

  openSettings() {
    this.props.dispatch(UserState.resetCurrentUser());
    this.props.dispatch(NavigationState.pushRoute({key: 'Settings', allowReturn: true}));
  },

  startJourney(id) {
    this.props.dispatch(UserState.setCurrentUser(id));
    this.props.dispatch(UserState.addActivity());
    this.props.dispatch(NavigationState.pushRoute({key: 'Activity', allowReturn: true}));
  },

  openPasswordModal() {
    this.setState({isPasswordModalOpen: true});
  },

  closePasswordModal() {
    this.setState({isPasswordModalOpen: false});
  },

  hideBubble() {
    this.setState({showBubble: false});
  },

  // TODO: Clean up. Too much repetition atm.
  render() {
    var userIcons = [];

    if (this.props.users.size > 0) {
      for (var i = 0; i < this.props.users.size; i++) {

        var name = <Text style={styles.name}> {this.props.users.get(i).get('name')} </Text>;

        /* If app has more than 4 children in it, only names of the children are displayed */
        if (this.props.users.size > 4) {
          userIcons.push(
            <View key={i} style={styles.userRowWithoutImage}>
              <View>
                <TouchableHighlight
                  onPress={this.startJourney.bind(this, i)}>
                  {name}
                </TouchableHighlight>
              </View>
            </View>
          );

          var rightcolumn = <View style={styles.rightcolumn}>{userIcons}</View>;
        }
        else {
          userIcons.push(
            <Image source={require('../../../assets/graphics/1/kehys.png')} key={i} style={styles.userRow}>
              <TouchableHighlight
                onPress={this.startJourney.bind(this, i)}>
                <Image style={styles.icon} source={{uri: this.props.users.get(i).get('image')}}/>
              </TouchableHighlight>
              <View>
                {name}
              </View>
            </Image>
          );

          rightcolumn = (
            <View style={[styles.rightcolumn, {flexDirection: 'column', flexWrap: 'wrap'}]}>
              {userIcons}
            </View>
          );
        }
      }

      if (this.state.showBubble === true) {
        var speechBubble = (
          <SpeechBubbleView
            text={'userIsKnown'}
            hideBubble={this.hideBubble}
            bubbleType={require('../../../assets/graphics/puhekupla_norm.png')}
            style={{top: 20, left: 280, height: 260, width: 300, margin: 60}}/>
          );
      }
      else {
        speechBubble = null;
      }
    }

    else {
      userIcons.push(
        <Image source={require('../../../assets/graphics/1/kehys.png')} key={0} style={styles.userRow}>
          <Image source={require('../../../assets/default-icon.png')} style={styles.icon}/>
          <View>
            <Text style={styles.name}> Nimi </Text>
          </View>
        </Image>
      );

      rightcolumn = <View style={[styles.rightcolumn, {flexDirection: 'row'}]}>{userIcons}</View>;
      speechBubble = (
        <SpeechBubble
          text={'userIsUnknown'}
          bubbleType={require('../../../assets/graphics/1/puhekupla_aset.png')}
          style={{top: 20, left: 230, height: 200, width: 355, margin: 40}}/>
      );
    }

    if (this.state.isPasswordModalOpen === true) {
      var passwordModal = <PasswordModal onClose={this.closePasswordModal} onSuccess={this.openSettings}/>;
    }
    else {
      passwordModal = null;
    }

    return (
      <Image source={require('../../../assets/graphics/1/tausta_hemmolla.png')} style={styles.container}>
        <View style={styles.leftcolumn}>
          <View style={styles.settingsButton}>
            <TouchableHighlight onPress={this.openPasswordModal}>
              <Image
                source={require('../../../assets/graphics/1/asetukset.png')}
                style={{height: 40, width: 40}}/>
            </TouchableHighlight>
          </View>
        </View>

        {rightcolumn}
        {speechBubble}
        {passwordModal}
      </Image>
    );
  }
});

export default HomeView;
