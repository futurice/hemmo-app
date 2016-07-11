import * as SettingsState from '../../modules/settings/SettingsState';
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
      var id = this.props.users.size;
      // If id == null, new user is created. Otherwise users[id] will be edited.
      if (this.props.currentUser.get('id') === null) {
        this.props.dispatch(SettingsState.setCurrentUserValue('id', id));
        this.props.dispatch(SettingsState.createUser(id, this.props.currentUser));
      }
      else {
        this.props.dispatch(SettingsState.editUser(this.props.currentUser));
      }
      // TODO: Check is adding was successful!
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
    Alert.alert('Not implemented yet', 'Coming soon! :)');
  },
  getChangedName(e) {
    this.props.dispatch(SettingsState.setCurrentUserValue('name', e.nativeEvent.text));
  },
  getChangedAge(e) {
    this.props.dispatch(SettingsState.setCurrentUserValue('age', e.nativeEvent.text));
  },

  // TODO: Display default-image after opening.
  openImageGallery() {
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.customButton) {
        this.props.dispatch(SettingsState.setCurrentUserValue('image', null));
      }
      else {
        const source = {uri: response.uri, isStatic: true};

        this.props.dispatch(SettingsState.setCurrentUserValue('image', source.uri));
      }
    });
  },

  render() {

    if (this.props.currentUser.get('id') !== null)
    {
      removeButton = <TouchableHighlight
        style={styles.touchable}
        onPress={this.verifyRemove}>
        <View style={styles.removebutton}>
          <Text style={[styles.label, styles.highlight]}>
            Poista
          </Text>
        </View>
      </TouchableHighlight>;
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
                style={styles.save_touchable}>

                <View style={styles.savebutton}>
                  <Text style={styles.save_label}>
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

              {removeButton}
            </View>

          </View>
        </View>
      </View>
    );
  }
});

export default SettingsView;
