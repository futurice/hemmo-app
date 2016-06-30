import * as SettingsState from './SettingsState';
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

var newKid = {id: null, name: null, age: null, image: null};

const SettingsView = React.createClass({

  propTypes: {
    userImage: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map)
  },

  saveUser() {
    if (newKid.name === null || newKid.age === null || newKid.image === null) {
      Alert.alert('Puuttuvia tietoja', 'Varmistathan, että kaikki kohdat on täytetty ennen jatkamista.');
    }
    else {
      console.log('Lapsen nimi ja ikä olivat ' + newKid.name + ' ' + newKid.age + ' ' + newKid.image);
      newKid.id = this.props.users.size;

      this.props.dispatch(HomeState.createUser(newKid));
      this.props.dispatch(SettingsState.removeImage());

      newKid = {id: null, name: null, age: null, image: null};

      // TODO: Check is adding was successful!
      this.props.dispatch(NavigationState.popRoute());
    }
  },
  getChangedName(e) {
    newKid.name = e.nativeEvent.text;
  },
  getChangedAge(e) {
    newKid.age = e.nativeEvent.text;
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

        newKid.image = source.uri;

        this.props.dispatch(SettingsState.loadImage(source.uri));
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
                style={styles.touchable}>

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
