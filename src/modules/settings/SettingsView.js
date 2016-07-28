import * as NavigationState from '../../modules/navigation/NavigationState';
import * as UserState from '../../modules/user/UserState';
import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';

import {
  NativeModules,
  Image,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  View
} from 'react-native';

var styles = require('./styles.js');
var options = require('./image-picker-options');
var ImagePicker = NativeModules.ImagePickerManager;
var removeButton;
var texts;

const SettingsView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map)
  },

  getUserNames() {
    texts = this.props.users.map((user) => user.get('name'));
    texts = texts.concat(['+ Lisää']);
    return texts;
  },

  saveUser() {
    if (this.props.currentUser.get('name') === '' ||
        this.props.currentUser.get('image') === null) {
      Alert.alert('Puuttuvia tietoja', 'Varmistathan, että kaikki kohdat on täytetty ennen jatkamista.');
    }
    else {

      var newId = this.props.users.size;

      if (this.props.currentUser.get('id') === null) {
        this.props.dispatch(UserState.setCurrentUserValue('id', newId));
        this.props.dispatch(UserState.createUser(this.props.currentUser));
      }
      else {
        this.props.dispatch(UserState.editUser(this.props.currentUser));
      }
    }
  },

  cancel() {
    this.props.dispatch(NavigationState.popRoute());
  },

  verifyRemove() {
    Alert.alert(
      'Oletko varma?',
      'Haluatko varmasti poistaa käyttäjän x?',
      [{
        text: 'Kyllä',
        onPress: this.remove
      },{
        text: 'Peruuta'}
      ]
    );
  },

  remove() {
    this.props.dispatch(UserState.removeUser(this.props.currentUser.get('id')));
    this.props.dispatch(UserState.resetCurrentUser());
  },

  getChangedName(e) {
    this.props.dispatch(UserState.setCurrentUserValue('name', e.nativeEvent.text));
  },

  // TODO: Display default-image after opening.
  openImageGallery() {
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.customButton) {
        this.props.dispatch(UserState.setCurrentUserValue('image', null));
      }
      else {
        const source = {uri: response.uri, isStatic: true};

        this.props.dispatch(UserState.setCurrentUserValue('image', source.uri));
      }
    });
  },

  addTab() {
    this.props.dispatch(UserState.resetCurrentUser());
  },

  handleClick(user, index) {
    if (user === '+ Lisää') {
      this.addTab();
    }
    else {
      this.viewUserProfile(index);
    }
  },

  viewUserProfile(index) {
    this.props.dispatch(UserState.setCurrentUser(index));
  },

  render() {

    if (this.props.currentUser.get('id') !== null)
    {
      removeButton = (<Button
        style={styles.removebutton} highlightStyle={styles.buttonHighlight}
        onPress={this.verifyRemove} text={'Poista'} icon={''}/>);
    }
    else {
      removeButton = null;
    }
    var tabTexts = this.getUserNames();
    var tabs = tabTexts.map((user, index) => (
      <TouchableOpacity
        key={index}
        onPress={this.handleClick.bind(this, user, index)}
        style={{width: 80, alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>
          {user}
        </Text>
      </TouchableOpacity>
    ));

    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <View style={styles.titleBarSection}>
            <Icon onPress={this.cancel} size={30} name={'angle-left'}/>
          </View>

          <View style={styles.titleBarSection}>
            <Icon size={30} name={'cog'}/>
            <Text> Asetukset </Text>
          </View>

          <View style={styles.titleBarSection}>
            <Icon size={30} name={'volume-off'}/>
          </View>
        </View>

        <View style={styles.tabBar}>
          {tabs}
        </View>
        <View style={styles.form}>
          <View style={styles.leftColumn}>
            <View style={styles.inputField}>
              <Text style={styles.label}>
                Nimi
              </Text>
              <TextInput
                style={styles.input}
                ref = 'name'
                onChange = {this.getChangedName}
                value={this.props.currentUser.get('name')}/>
            </View>
            <View style={styles.imagefield}>
             <Image
               style={styles.icon}
               source={{uri: this.props.currentUser.get('image')}}/>
             <Button
               style={styles.changeImageButton} highlightStyle={styles.changeImageHighlight}
               onPress={this.openImageGallery} text={'Ota uusi kuva'} icon={'camera'}/>
            </View>
          </View>

          <View style={styles.rightColumn}>
            <View style={styles.rightColumn}>
              <View style={styles.buttonfield}>
                <Button
                  style={styles.savebutton} highlightStyle={styles.save_touchable}
                  onPress={this.saveUser} text={'Tallenna'} icon={''}/>
                <View style={styles.bottomRow}>
                  <Button
                    style={styles.cancelbutton} highlightStyle={styles.buttonHighlight}
                    onPress={this.cancel} text={'Peruuta'} icon={''}/>
                  {removeButton}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
});

export default SettingsView;
