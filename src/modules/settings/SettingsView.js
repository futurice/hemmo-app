import * as SettingsState from './SettingsState';
import * as HomeState from '../../modules/home/HomeState';
import React, {PropTypes} from 'react';

import {
  NativeModules,
  TouchableHighlight,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

var name;
var age;
var styles = require('./styles.js');

var ImagePicker = NativeModules.ImagePickerManager;

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

  createKid() { /* ei toimi oikein */
    console.log('Lapsen nimi ja ikä olivat ' + name + ' ' + age);
    this.props.dispatch(HomeState.addKid(name, age));
  },
  getName(e) {
    name = e.nativeEvent.text;
  },
  getAge(e) {
    age = e.nativeEvent.text;
  },

  openGallery() {
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else {
        const source = {uri: response.uri, isStatic: true};

        this.props.dispatch(SettingsState.updateImage(source.uri));
      }
      //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

      // uri (on iOS)
      //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
      // uri (on android)
    });
  },

  render() {
    console.log('USERIMAGE ' + this.props.userImage);

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
