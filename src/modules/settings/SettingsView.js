import * as HomeState from '../../modules/home/HomeState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';

import {
  NativeModules,
  TouchableHighlight,
  Image,
  Alert,
  Text,
  TextInput,
  View
} from 'react-native';

var styles = require('./styles.js');
var options = require('./image-picker-options');
var ImagePicker = NativeModules.ImagePickerManager;

const SettingsView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map)
  },

  saveUser() {
    // TODO: CHECK IF STRINGS ARE NULL OR EMPTY
    if (this.props.currentUser.get('name') === null ||
        this.props.currentUser.get('age') === null ||
        this.props.currentUser.get('image') === null) {
      Alert.alert('Puuttuvia tietoja', 'Varmistathan, että kaikki kohdat on täytetty ennen jatkamista.');
    }
    else {
      var id = this.props.users.size;

      console.log('CURRENT USER ID ' + this.props.currentUser.get('id'));

      // If id == null, new user is created. Otherwise users[id] will be edited.
      if (this.props.currentUser.get('id') === null) {
        console.log('LISÄTÄÄN UUSI');

        this.props.dispatch(HomeState.createUser(id, this.props.currentUser));
      }
      else {
        console.log('MUOKATAAN VANHAA');
        this.props.dispatch(HomeState.editUser(this.props.currentUser));
      }

      // TODO: Check is adding was successful!
      this.props.dispatch(NavigationState.popRoute());
    }
  },
  cancel() {
    this.props.dispatch(NavigationState.popRoute());
  },
  getChangedName(e) {
    this.props.dispatch(HomeState.setCurrentUserValue('name', e.nativeEvent.text));
  },
  getChangedAge(e) {
    this.props.dispatch(HomeState.setCurrentUserValue('age', e.nativeEvent.text));
  },

  // TODO: Add 'Remove image'
  // TODO: Display default-image after opening.
  openImageGallery() {
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else {
        const source = {uri: response.uri, isStatic: true};

        this.props.dispatch(HomeState.setCurrentUserValue('image', source.uri));
      }
    });
  },

  render() {
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
                  source={{uri: this.props.currentUser.get('image')}}
                />
                <TouchableHighlight
                  onPress={this.openImageGallery}
                  style={styles.touchable}>
                  <View style={styles.changeImageButton}>
                    <Text style={[styles.label, styles.highlight]}>
                      Vaihda
                    </Text>
                  </View>
                </TouchableHighlight>
            </View>
          </View>

          <View style={styles.rightColumn}>

            <View style={styles.buttonfield}>
              <TouchableHighlight
                onPress={this.saveUser}
                style={styles.touchable}>

                <View style={styles.savebutton}>
                  <Text style={[styles.label, styles.highlight]}>
                    Tallenna
                  </Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.touchable}
                onPress={this.cancel}>
                <View style={styles.cancelbutton}>
                  <Text style={[styles.label, styles.highlight]}>
                    Peruuta
                  </Text>
                </View>
              </TouchableHighlight>
            </View>

          </View>
        </View>
      </View>
    );
  }
});

export default SettingsView;
