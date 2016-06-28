import * as SettingsState from './SettingsState';
import * as HomeState from '../../modules/home/HomeState';
import * as NavigationState from '../../modules/navigation/NavigationState';

import React, {PropTypes} from 'react';

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

var ImagePicker = NativeModules.ImagePickerManager;
var newKid = {name: null, age: null, image: null};

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

  propTypes: {
    userImage: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired
  },

  createKid() {
    if (newKid.name === null || newKid.age === null || newKid.image === null) {
      Alert.alert('Puuttuvia tietoja', 'Varmistathan, että kaikki kohdat on täytetty ennen jatkamista.');
    }
    else {
      console.log('Lapsen nimi ja ikä olivat ' + newKid.name + ' ' + newKid.age + ' ' + newKid.image);
      this.props.dispatch(HomeState.addKid(newKid));
      this.props.dispatch(SettingsState.removeImage());

      newKid = {name: null, age: null, image: null};
      //Back to front page
      this.props.dispatch(NavigationState.popRoute());
    }
  },
  getName(e) {
    newKid.name = e.nativeEvent.text;
  },
  getAge(e) {
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
    return (
      <View style={styles.container}>
        <View style={styles.form}>

          <View style={styles.fieldcolumn}>

            <View style={styles.field}>
              <Text style={styles.label}>
                Nimi:
              </Text>
              <View>
                <TextInput style={styles.input}
                  ref = 'name'
                  onChange = {this.getName}/>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>
                Ikä:
              </Text>
              <View>
                <TextInput keyboardType='numeric' style={styles.input}
                ref='age'
                onChange={this.getAge}
                />
              </View>
            </View>

            <View style={styles.imagefield}>
              <TouchableHighlight style={styles.touchable}>
                <Image style={styles.icon} source={{uri: this.props.userImage}}/>
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
