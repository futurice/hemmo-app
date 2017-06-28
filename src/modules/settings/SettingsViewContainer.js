import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import SaveConfirmationWindow from '../../components/SaveConfirmationWindow';
import { NavigationActions } from 'react-navigation';
import {
  setCurrentUserValue,
  createUser,
  editUser,
  removeUser,
  resetCurrentUser,
  setCurrentUser,
} from '../../modules/user/UserState';
import { post } from '../../utils/api';
import { getSizeByHeight, getSizeByWidth, getImage } from '../../services/graphics';
import {
  NativeModules,
  PermissionsAndroid,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  View,
} from 'react-native';

const styles = require('./styles.js');
const options = require('./image-picker-options');

const ImagePicker = require('react-native-image-picker');

const mapStateToProps = state => ({
  loading: state.getIn(['home', 'loading']),
  users: state.getIn(['user', 'users']),
  currentUser: state.getIn(['user', 'currentUser']),
});

const mapDispatchToProps = dispatch => ({
  setCurrentUserValue: (key, value) => dispatch(setCurrentUserValue(key, value)),
  createUser: user => dispatch(createUser(user)),
  editUser: user => dispatch(editUser(user)),
  removeUser: id => dispatch(removeUser(id)),
  resetCurrentUser: () => dispatch(resetCurrentUser()),
  setCurrentUser: id => dispatch(setCurrentUser(id)),
  popRoute: () => dispatch(NavigationActions.back()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingsViewContainer extends Component {

  static propTypes = {
    setCurrentUserValue: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    resetCurrentUser: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    popRoute: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map),
  };

  state = {
    loading: false,
    disabled: true,
    showSucceedingMessage: false,
  };

  infoIsMissing = () => this.props.currentUser.get('name') === '' || this.props.currentUser.get('image') === null;

  saveUser = () => {
    if (this.infoIsMissing()) {
      Alert.alert('Puuttuvia tietoja', 'Varmistathan, että kaikki kohdat on täytetty ennen jatkamista.');
    } else if (this.props.currentUser.get('id') === null) {
      const name = this.props.currentUser.get('name');
      const newId = this.props.users.size;

      this.setState({ loading: true });

      // TODO: move this API call to another place
      post('/register', { name })
        .then(result =>
          this.props.setCurrentUserValue('token', `Bearer ${result.token}`),
        )
        .then(() => {
          this.props.setCurrentUserValue('id', newId);
          this.props.createUser(this.props.currentUser);
          this.setState({ disabled: true, loading: false });
          this.showSucceedingMessage();
        })
        .catch((error) => {
          console.log(error);
          this.setState({ loading: false });
          Alert.alert('Virhe käyttäjän luonnissa!', 'Yritä myöhemmin uudelleen.');
        });
    } else {
      this.props.editUser(this.props.currentUser);
      this.setState({ disabled: true });
    }
  };

  showSucceedingMessage = () => {
    this.setState({ showSucceedingMessage: true });
  };

  closeSucceedingMessage = () => {
    this.setState({ showSucceedingMessage: false });
  };

  verifyRemoveUser = () => {
    Alert.alert(
      'Oletko varma?',
      `Haluatko varmasti poistaa käyttäjän ${this.props.currentUser.get('name')}?`,
      [{
        text: 'Kyllä',
        onPress: this.removeUser,
      }, {
        text: 'Peruuta' },
      ],
    );
  };

  removeUser = () => {
    this.props.removeUser(this.props.currentUser.get('id'));
    this.props.resetCurrentUser();
  };

  getChangedName = (e) => {
    if (this.state.disabled === true) {
      this.setState({ disabled: false });
    }

    this.props.setCurrentUserValue('name', e.nativeEvent.text);
  };

  // TODO: Display default-image after opening.
  openImageGallery = async () => {
    try {
      const grantedObj = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      // Make sure each value is 'granted'
      const granted = Object.values(grantedObj).reduce((a, b) => a && b === 'granted', true);

      if (!granted) {
        console.log('Camera permission denied');
        return;
      }

      ImagePicker.launchCamera(options, (response) => {
        if (!response.didCancel) {
          const source = { uri: response.uri, isStatic: true };
          this.setState({ disabled: false });

          this.props.setCurrentUserValue('image', source.uri);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleTabClick = (user, index) => {
    if (user === '+ Lisää lapsi') {
      this.props.resetCurrentUser();
    } else {
      this.props.setCurrentUser(index);
    }
  };

  renderTabBar = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
      {this.renderTabs()}
    </ScrollView>
    );

  renderTabs = () => this.props.users.map((user, key) =>
      this.renderTab(user.get('name'), key)).concat(this.renderTab('+ Lisää lapsi', -1));

  renderTab = (name, key) => (
    <TouchableOpacity key={key} onPress={() => this.handleTabClick(name, key)}>
      <Image
        source={getImage('valilehti_tyhja')}
        onPress={() => this.handleTabClick(name, key)}
        style={[styles.tab, getSizeByHeight('valilehti_tyhja', 0.12)]}
      >
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[styles.tabText, styles.font, { fontWeight: this.tabIsSelected(key) ? 'bold' : 'normal' }]}
        >
          {name}
        </Text>
      </Image>
    </TouchableOpacity>
    );

  tabIsSelected = key => key === this.props.currentUser.get('id') || (this.props.currentUser.get('id') === null && key === -1);

  renderBackButton = () => (
    <TouchableOpacity onPress={this.props.popRoute} style={styles.titleBarSection}>
      <Image
        source={getImage('nappula_takaisin')}
        onPress={this.props.popRoute}
        style={[styles.backButton, getSizeByHeight('nappula_takaisin', 0.1)]}
      />
    </TouchableOpacity>
    );

  renderTitleBar = () => (
    <View style={styles.titleBar}>
      {this.renderBackButton()}

      <View style={styles.titleBarSection}>
        <Image source={getImage('ratas')} style={getSizeByHeight('ratas', 0.08)} />
        <Image source={getImage('asetukset')} style={getSizeByHeight('asetukset', 0.05)} />
      </View>
    </View>
    );

  renderTextInput = () => (
    <View style={styles.inputField}>
      <Text style={[styles.label, styles.font]}>
          Nimi
        </Text>

      <View style={styles.textInputView}>
        <TextInput
          style={styles.input}
          ref="name"
          onChange={this.getChangedName}
          value={this.props.currentUser.get('name')}
        />
      </View>
    </View>
    );

  renderImageField = () => (
    <View style={styles.imagefield}>
      <Image source={getImage('nelio')} style={getSizeByWidth('nelio', 0.25)}>
        <Image
          style={styles.icon}
          source={{ uri: this.props.currentUser.get('image') }}
        />
      </Image>

      <TouchableOpacity onPress={this.openImageGallery}>
        <Image
          source={getImage('nappula_uusikuva')}
          style={[{ marginLeft: 20 }, getSizeByWidth('nappula_uusikuva', 0.15)]}
        />
      </TouchableOpacity>
    </View>
    );

  renderTabBodyLeftColumn = () => (
    <View style={styles.leftColumn}>
      {this.renderTextInput()}
      {this.renderImageField()}
    </View>
    );

  renderSaveButton = () => (
    <TouchableOpacity
      disabled={this.state.disabled}
      onPress={this.saveUser}
    >
      <Image
        source={getImage('nappula_tallenna')}
        style={[getSizeByWidth('nappula_tallenna', 0.25),
            { opacity: this.state.disabled ? 0.2 : 1 }]}
      />
    </TouchableOpacity>
    );

  renderCancelButton = () => (
    <Button
      style={styles.cancelbutton}
      highlightStyle={styles.buttonHighlight}
      onPress={this.props.popRoute}
      text={'Peruuta'}
      icon={''}
    />
    );

  renderRemoveUserButton = () => this.props.currentUser.get('id') !== null ? (
    <Button
      style={styles.removeButton}
      highlightStyle={styles.buttonHighlight}
      onPress={this.verifyRemoveUser}
      text={'Poista'}
      icon={''}
    />
    ) : null;

  renderTabBodyRightColumn = () => (
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

  renderTabBody = () => (
    <Image
      source={getImage('tausta_asetukset')}
      style={[styles.form, getSizeByWidth('tausta_asetukset', 0.9)]}
    >

      {this.renderTabBodyLeftColumn()}
      {this.renderTabBodyRightColumn()}
    </Image>
    );

  renderSaveConfirmationWindow = () => this.state.showSucceedingMessage ? (
    <SaveConfirmationWindow closeWindow={() => this.closeSucceedingMessage()} />
    ) : null;

  render() {
    if (this.state.loading) {
      return (
        <LoadingSpinner />
      );
    }

    return (
      <Image source={getImage('tausta_perus')} style={styles.container}>
        {this.renderTitleBar()}
        {this.renderTabBar()}
        {this.renderTabBody()}
        {this.renderSaveConfirmationWindow()}
      </Image>
    );
  }
}
