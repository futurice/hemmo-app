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

// NOTE: Re-use settings-module when editing existing children!

var styles = require('./styles.js');

var ImagePicker = NativeModules.ImagePickerManager;
var newKid = {id: null, name: null, age: null, image: null};

var options = {
  title: 'Valitse kuvake', // specify null or empty string to remove the title
  cancelButtonTitle: 'Peruuta',
  takePhotoButtonTitle: 'Ota valokuva...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Valitse galleriasta...',
  customButtons: {
     //'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  },
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  maxWidth: 100, // photos only
  maxHeight: 100, // photos only
  aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 1, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false
};

const SettingsView = React.createClass({

  // TODO: Retrieve currentUser.
  propTypes: {
    userImage: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    kids: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map)
  },

  createKid() {
    if (newKid.name === null || newKid.age === null || newKid.image === null) {
      Alert.alert('Puuttuvia tietoja', 'Varmistathan, että kaikki kohdat on täytetty ennen jatkamista.');
    }
    else {
      console.log('Lapsen nimi ja ikä olivat ' + newKid.name + ' ' + newKid.age + ' ' + newKid.image);
      newKid.id = this.props.kids.size;

      this.props.dispatch(HomeState.addKid(newKid));
      this.props.dispatch(SettingsState.removeImage());

      newKid = {id: null, name: null, age: null, image: null};

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
  openGallery() {
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else {
        const source = {uri: response.uri, isStatic: true};

        newKid.image = source.uri;

        this.props.dispatch(SettingsState.loadImage(source.uri));
      }

      //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

      // uri (on iOS)
      //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
      // uri (on android)
    });
  },

  render() {
    // TODO: Check is user.id is empty/null -> fields are empty. Otherwise getName etc.

    console.log('NEW KID NAME BRUCE ' + this.props.currentUser.get('name'));

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.fieldcolumn}>
            <View style={styles.field}>
              <Text style={styles.label}>
                Nimi:
              </Text>
              <TextInput style={styles.input}
                ref = 'name'
                onChange = {this.getChangedName}
                value={this.props.currentUser.get('name')}/>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>
                Ikä:
              </Text>
              <TextInput keyboardType='numeric' style={styles.input}
                ref='age'
                onChange={this.getChangedAge}
                value={this.props.currentUser.get('age')}
                />
            </View>

            <View style={styles.imagefield}>
              <TouchableHighlight style={styles.touchable}>
                <Image style={styles.icon} source={{uri: this.props.currentUser.get('image')}}/>
              </TouchableHighlight>
            </View>

            <View style={styles.buttonfield}>
              <TouchableHighlight
                onPress={this.openGallery}
                style={styles.touchable}>
                <View style={styles.cancelbutton}>
                  <Text style={styles.label}>
                    Vaihda
                  </Text>
                </View>
              </TouchableHighlight>
            </View>

          </View>

          <View style={styles.buttoncolumn}>

            <View style={styles.buttonfield}>
              <TouchableHighlight
                onPress={this.createKid}
                style={styles.touchable}>

                <View style={styles.savebutton}>
                  <Text style={styles.label}>
                    Tallenna
                  </Text>
                </View>
              </TouchableHighlight>
            </View>

            <View style={styles.buttonfield}>
              <TouchableHighlight
                style={styles.touchable}>

                <View style={styles.cancelbutton}>
                  <Text style={styles.label}>
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
