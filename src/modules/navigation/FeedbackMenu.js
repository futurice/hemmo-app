import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  TouchableHighlight,
  Image,
  Button,
  Dimensions,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import { getSizeByHeight, getImage } from '../../services/graphics';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: null,
    width: null,
  },
  leftColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'center',
  },
  font: {
    fontSize: 20,
    fontFamily: 'Gill Sans',
  },
  settingsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});

const mapStateToProps = state => ({
  users: state.getIn(['user', 'users']),
  currentUser: state.getIn(['user', 'currentUser']),
  activitiesSize: state.getIn(['user', 'currentUser', 'answers', 'activities']).size,
  moodsSize: state.getIn(['user', 'currentUser', 'answers', 'moods']).size,
  freeWordSize: state.getIn(['user', 'currentUser', 'answers', 'freeWord']).size,
});

const mapDispatchToProps = dispatch => ({
  pushRoute: route => dispatch(NavigationActions.navigate({ routeName: route })),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class HomeViewContainer extends Component {
  renderLeftColumn = () => (
    <View style={styles.leftColumn}>
    </View>
    );

  renderRightColumn = users => (
    <View style={[styles.rightColumn, users.size <= 4 ? { flexDirection: 'row', flexWrap: 'wrap' } : null]}>
      {users.size > 0 ? this.renderUserIcons(users) : this.renderEmptyIcon()}
    </View>
    );

  renderUserIcons = users => users.map((user) =>
    (<Text>
    Hello world!
    </Text>),
    );

  renderEmptyIcon = () => (
    <UserItem
      name={this.renderUserName('Nimi')}
      key={0}
      index={0}
      empty
    />
    );

  renderUserName = name => (
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={styles.font}
    >{name}
    </Text>
    );

  renderButton = (title, image, onPress, done) => (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor="rgba(128, 128, 128, 0.5)"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        margin: 20,
        height: 80,
        justifyContent: 'center',
        borderRadius: 20,
      }}
      onPress={onPress}
      title={title}
    >
      <View style={{ padding: 10, flexDirection: 'row' }}>
        <Image
          source={image}
          style={{ width: 64, height: 64 }}
        />
        <Text style={{ fontSize: 24, textAlign: 'center', paddingLeft: 20, paddingTop: 16 }}>
          { title }
        </Text>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          { done
            ? <Image source={require('./checkmark.png')} style={{ width: 48, height: 48, marginTop: 8 }} />
            : null
          }
        </View>
      </View>
    </TouchableHighlight>
  );

  render() {
    const users = this.props.users;

    return (
      <Image source={getImage('tausta_perus3')} style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 100 }}>
            { this.renderButton(
              'Tekeminen',
              require('../icon_activities.png'),
              () => this.props.pushRoute('Activity'),
              this.props.activitiesSize,
            ) }
          </View>

          <View style={{ height: 100 }}>
            { this.renderButton(
              'Tunteet',
              require('../icon_moods.png'),
              () => this.props.pushRoute('Mood'),
              this.props.moodsSize,
            ) }
          </View>

          <View style={{ height: 100 }}>
            { this.renderButton(
              'Kerro vapaasti',
              require('../icon_tellfreely.png'),
              () => this.props.pushRoute('FreeWord'),
              this.props.freeWordSize,
            ) }
          </View>

          <View style={{ height: 100 }}>
            { this.renderButton(
              'Lähetä',
              require('../icon_send.png'),
              () => this.props.pushRoute('Ending')
            ) }
          </View>
        </View>
      </Image>
    );
  }
}
