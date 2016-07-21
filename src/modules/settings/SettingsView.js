import * as NavigationState from '../../modules/navigation/NavigationState';
import * as UserState from '../../modules/user/UserState';
import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import Button from '../../components/Button';

import {
  NativeModules,
  Image,
  Alert,
  Text,
  TextInput,
  View
} from 'react-native';

var styles = require('./styles.js');
var options = require('./image-picker-options');
var ImagePicker = NativeModules.ImagePickerManager;
var removeButton;

const SettingsView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map)
  },

  saveUser() {
    if (this.props.currentUser.get('name') === '' ||
        this.props.currentUser.get('age') === '' ||
        this.props.currentUser.get('image') === null) {
      Alert.alert('Puuttuvia tietoja', 'Varmistathan, että kaikki kohdat on täytetty ennen jatkamista.');
    }
    else {
      // If id == null, new user is created. Otherwise users[id] will be edited.
      if (this.props.currentUser.get('id') === null) {
        this.props.dispatch(UserState.createUser(this.props.currentUser));
      }
      else {
        this.props.dispatch(UserState.editUser(this.props.currentUser));
      }
      // TODO: Check if adding was successful!
      this.props.dispatch(NavigationState.popRoute());
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
    this.props.dispatch(NavigationState.popRoute());
  },

  getChangedName(e) {
    this.props.dispatch(UserState.setCurrentUserValue('name', e.nativeEvent.text));
  },

  getChangedAge(e) {
    this.props.dispatch(UserState.setCurrentUserValue('age', e.nativeEvent.text));
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

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.leftColumn}>

            <View style={styles.inputField}>
              <Text style={styles.label}>
                Nimi:
              </Text>
              <TextInput
                style={styles.input}
                ref = 'name'
                onChange = {this.getChangedName}
                value={this.props.currentUser.get('name')}/>
            </View>

            <View style={styles.inputField}>
              <Text style={styles.label}>
                Ikä:
              </Text>
              <TextInput
                keyboardType='numeric'
                style={styles.input}
                ref='age'
                onChange={this.getChangedAge}
                value={this.props.currentUser.get('age')}
                />
            </View>

            <View style={styles.imagefield}>
                <Image
                  style={styles.icon}
                  source={{uri: this.props.currentUser.get('image')}}/>
                <Button
                  style={styles.changeImageButton} highlightStyle={styles.buttonHighlight}
                  onPress={this.openImageGallery} text={'Vaihda'} icon={''}/>
            </View>
          </View>

          <View style={styles.rightColumn}>
            <View style={styles.buttonfield}>
              <Button
                style={styles.savebutton} highlightStyle={styles.save_touchable}
                onPress={this.saveUser} text={'Tallenna'} icon={''}/>
              <Button
                style={styles.cancelbutton} highlightStyle={styles.buttonHighlight}
                onPress={this.cancel} text={'Peruuta'} icon={''}/>
              {removeButton}
            </View>
          </View>
        </View>
      </View>
    );
  }
});

export default SettingsView;
