import * as NavigationState from '../../modules/navigation/NavigationState';
import * as UserState from '../../modules/user/UserState';
import React, {PropTypes} from 'react';
import {List, Map} from 'immutable';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import SaveConfirmationWindow from '../../components/SaveConfirmationWindow';
import {post} from '../../utils/api';
import {getSizeByHeight, getSizeByWidth, getImage} from '../../services/graphics';

import {
  NativeModules,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  View
} from 'react-native';

let styles = require('./styles.js');
let options = require('./image-picker-options');
let ImagePicker = NativeModules.ImagePickerManager;

const SettingsView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map)
  },

  getInitialState() {
    return {
      loading: false,
      disabled: true,
      showSucceedingMessage: false
    };
  },

  infoIsMissing() {
    return this.props.currentUser.get('name') === '' || this.props.currentUser.get('image') === null;
  },

  saveUser() {
    if (this.infoIsMissing()) {
      Alert.alert('Puuttuvia tietoja', 'Varmistathan, että kaikki kohdat on täytetty ennen jatkamista.');
    }
    else if (this.props.currentUser.get('id') === null) {
      let name = this.props.currentUser.get('name');
      let newId = this.props.users.size;

      this.setState({loading: true});

      // TODO: move this API call to another place
      post('/register', {name})
        .then(
          result => this.props.dispatch(UserState.setCurrentUserValue('token', 'Bearer ' + result.token))
            .then(() => {
              this.props.dispatch(UserState.setCurrentUserValue('id', newId));
              this.props.dispatch(UserState.createUser(this.props.currentUser));
              this.setState({disabled: true, loading: false});
              this.showSucceedingMessage();
            }))
        .catch((error) => {
          this.setState({loading: false});
          Alert.alert('Virhe käyttäjän luonnissa!', 'Yritä myöhemmin uudelleen.');
        });
    }
    else {
      this.props.dispatch(UserState.editUser(this.props.currentUser));
      this.setState({disabled: true});
    }
  },

  cancel() {
    this.props.dispatch(NavigationState.popRoute());
  },

  showSucceedingMessage() {
    this.setState({showSucceedingMessage: true});
  },

  closeSucceedingMessage() {
    this.setState({showSucceedingMessage: false});
  },

  verifyRemove() {
    Alert.alert(
      'Oletko varma?',
      'Haluatko varmasti poistaa käyttäjän ' + this.props.currentUser.get('name') + '?',
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
    if (this.state.disabled === true) {
      this.setState({disabled: false});
    }
    this.props.dispatch(UserState.setCurrentUserValue('name', e.nativeEvent.text));
  },

  // TODO: Display default-image after opening.
  openImageGallery() {
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        return;
      }
      else if (response.customButton) {
        this.props.dispatch(UserState.setCurrentUserValue('image', null));
      }
      else {
        const source = {uri: response.uri, isStatic: true};
        this.setState({disabled: false});

        this.props.dispatch(UserState.setCurrentUserValue('image', source.uri));
      }
    });
  },

  handleTabClick(user, index) {
    if (user === '+ Lisää lapsi') {
      this.addNewChildTab();
    }
    else {
      this.viewUserProfile(index);
    }
  },

  addNewChildTab() {
    this.props.dispatch(UserState.resetCurrentUser());
  },

  viewUserProfile(index) {
    this.props.dispatch(UserState.setCurrentUser(index));
  },

  renderTabBar() {
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tabBar}>
        {this.renderTabs()}
      </ScrollView>
    );
  },

  renderTabs() {
    return this.props.users.map((user, key) =>
      this.renderTab(user.get('name'), key)).concat(this.renderTab('+ Lisää lapsi', -1));
  },

  renderTab(name, key) {
    return (
      <TouchableOpacity key={key} onPress={this.handleTabClick.bind(this, name, key)}>
        <Image
          source={getImage('valilehti_tyhja')}
          onPress={this.handleTabClick.bind(this, name, key)}
          style={[styles.tab, getSizeByHeight('valilehti_tyhja', 0.12)]}>
          <Text
            ellipsizeMode='tail'
            numberOfLines={1}
            style={[styles.tabText, styles.font, {fontWeight: this.tabIsSelected(key) ? 'bold' : 'normal'}]}>
            {name}
          </Text>
        </Image>
      </TouchableOpacity>
    );
  },

  tabIsSelected(index) {
    return index === this.props.currentUser.get('id') || (this.props.currentUser.get('id') === null && index === -1);
  },

  renderBackButton() {
    return (
      <TouchableOpacity onPress={this.cancel} style={styles.titleBarSection}>
        <Image
          source={getImage('nappula_takaisin')}
          onPress={this.cancel} style={[styles.backButton, getSizeByHeight('nappula_takaisin', 0.1)]}/>
      </TouchableOpacity>
    );
  },

  renderTitleBar() {
    return (
      <View style={styles.titleBar}>
        {this.renderBackButton()}

        <View style={styles.titleBarSection}>
          <Image source={getImage('ratas')} style={getSizeByHeight('ratas', 0.08)}/>
          <Image source={getImage('asetukset')} style={getSizeByHeight('asetukset', 0.05)}/>
        </View>
      </View>
    );
  },

  renderTextInput() {
    return (
      <View style={styles.inputField}>
        <Text style={[styles.label, styles.font]}>
          Nimi
        </Text>

        <View style={styles.textInputView}>
          <TextInput
            style={styles.input}
            ref = 'name'
            onChange = {this.getChangedName}
            value={this.props.currentUser.get('name')}/>
        </View>
      </View>
    );
  },

  renderImageField() {
    return (
      <View style={styles.imagefield}>
        <Image source={getImage('nelio')} style={getSizeByWidth('nelio', 0.25)}>
          <Image
            style={styles.icon}
            source={{uri: this.props.currentUser.get('image')}}/>
        </Image>

        <TouchableOpacity onPress={this.openImageGallery}>
          <Image
            source={getImage('nappula_uusikuva')}
            style={[{marginLeft: 20}, getSizeByWidth('nappula_uusikuva', 0.15)]}/>
        </TouchableOpacity>
      </View>
    );
  },

  renderTabBodyLeftColumn() {
    return (
      <View style={styles.leftColumn}>
        {this.renderTextInput()}
        {this.renderImageField()}
      </View>
    );
  },

  renderSaveButton() {
    return (
      <TouchableOpacity
        disabled={this.state.disabled}
        onPress={this.saveUser}>
        <Image
          source={getImage('nappula_tallenna')}
          style={[getSizeByWidth('nappula_tallenna', 0.25),
            {opacity: this.state.disabled ? 0.2 : 1}]}/>
      </TouchableOpacity>
    );
  },

  renderCancelButton() {
    return (
      <Button
        style={styles.cancelbutton}
        highlightStyle={styles.buttonHighlight}
        onPress={this.cancel}
        text={'Peruuta'}
        icon={''}
      />
    );
  },

  renderRemoveUserButton() {
    return this.props.currentUser.get('id') !== null ? (
      <Button
        style={styles.removeButton}
        highlightStyle={styles.buttonHighlight}
        onPress={this.verifyRemove}
        text={'Poista'}
        icon={''}
      />
    ) : null;
  },

  renderTabBodyRightColumn() {
    return (
      <View style={styles.rightColumn}>
        <View style={styles.buttonfield}>
          {this.renderSaveButton()}

          <View style={styles.bottomRow}>
            {this.renderCancelButton()}
            {this.renderRemoveUserButton()}
          </View>
        </View>
      </View>
    );
  },

  renderTabBody() {
    return (
      <Image
        source={getImage('tausta_asetukset')}
        style={[styles.form, getSizeByWidth('tausta_asetukset', 0.9)]}>

        {this.renderTabBodyLeftColumn()}
        {this.renderTabBodyRightColumn()}
      </Image>
    );
  },

  render() {
    if (this.state.loading) {
      return (
        <LoadingSpinner/>
      );
    }

    return (
      <Image source={getImage('tausta_perus')} style={styles.container}>
        {this.renderTitleBar()}
        {this.renderTabBar()}
        {this.renderTabBody()}
        {this.state.showSucceedingMessage ? <SaveConfirmationWindow closeWindow={this.closeSucceedingMessage}/> : null}
      </Image>
    );
  }
});

export default SettingsView;
