import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import {
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import LoadingSpinner from '../../components/LoadingSpinner';
import SaveConfirmationWindow from '../../components/SaveConfirmationWindow';
import {
  createUser,
  editUser,
  removeUser,
  resetCurrentUser,
  setCurrentUser,
} from '../../state/UserState';
import { post, patch } from '../../utils/api';
import {
  getSizeByHeight,
  getSizeByWidth,
  getImage,
} from '../../services/graphics';

const iconSize = getSizeByWidth('nelio', 0.22).width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {},
  tabBar: {
    flexDirection: 'row',
    flexGrow: 0,
    padding: 15,
  },
  tab: {
    borderBottomWidth: 3,
    padding: 10,
    marginRight: 15,
  },
  tabText: {
    fontSize: 15,
  },
  formField: {
    marginTop: 10,
  },
  label: {
    marginLeft: 10,
    fontSize: 17,
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    ...Platform.select({
      ios: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: 'rgba(65,65,65,1)',
        backgroundColor: 'rgba(209, 209, 209, 0.29)',
      },
    }),
  },
  tabBody: {},
  image: {
    margin: 10,
  },
  icon: {
    flex: 1,
    margin: 10,
    width: iconSize,
    height: iconSize,
  },
  saveButton: {
    margin: 15,
  },
  removeButton: {
    margin: 15,
  },
  removeButtonText: {
    color: '#E64C4C',
  },
  buttonColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const options = require('./image-picker-options');

const ImagePicker = require('react-native-image-picker');
const Permissions = require('react-native-permissions');

const defaultUser = {
  nickName: __DEV__ ? 'Testikäyttäjä' : '',
  fullName: __DEV__ ? 'Matti Meikäläinen' : '',
  birthYear: __DEV__ ? '2010' : null,
};

const mapStateToProps = state => ({
  loading: state.getIn(['home', 'loading']),
  users: state.getIn(['user', 'users']),
});

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user)),
  editUser: user => dispatch(editUser(user)),
  removeUser: id => dispatch(removeUser(id)),
  resetCurrentUser: () => dispatch(resetCurrentUser()),
  setCurrentUser: id => dispatch(setCurrentUser(id)),
  popRoute: () => dispatch(NavigationActions.back()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingsViewContainer extends Component {
  static navigationOptions = {
    title: 'Asetukset',
    headerStyle: { backgroundColor: '#FFFFFF' },
  };

  static propTypes = {
    createUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    resetCurrentUser: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    popRoute: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(List).isRequired,
  };

  state = {
    loading: false,
    disabled: !__DEV__,
    showSucceedingMessage: false,
    id: null,
    image: null,
    ...defaultUser,
  };

  infoIsMissing = () => this.state.nickName.length === 0;

  saveChild = () => {
    if (this.infoIsMissing()) {
      Alert.alert(
        'Puuttuvia tietoja',
        'Varmistathan, että kaikki kohdat on täytetty ennen jatkamista.',
      );
    } else if (this.state.id === null) {
      this.createChild();
    } else {
      this.editChild();
    }
  };

  createChild = () => {
    this.setState({ loading: true });

    post('/app/children', {
      name: this.state.fullName,
      birthYear: this.state.birthYear,
    })
      .then(result => {
        this.props.createUser(
          Map({
            id: result.id,
            token: `Bearer ${result.token}`,
            name: this.state.nickName,
            image: this.state.image,
          }),
        );

        this.setState({ disabled: true, loading: false });
        this.resetForm();
        this.showSucceedingMessage();
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        Alert.alert('Virhe käyttäjän luonnissa!', 'Yritä myöhemmin uudelleen.');
      });
  };

  editChild = () => {
    this.setState({ loading: true });

    this.props.editUser(
      Map({
        id: this.state.id,
        name: this.state.nickName,
        image: this.state.image,
      }),
    );

    this.setState({ disabled: true, loading: false });
    this.showSucceedingMessage();
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
      `Haluatko varmasti poistaa lapsen ${this.state.nickName}?`,
      [
        {
          text: 'Kyllä',
          onPress: this.removeUser,
        },
        {
          text: 'Peruuta',
        },
      ],
    );
  };

  removeUser = () => {
    this.props.removeUser(this.state.id);
    this.resetForm();
  };

  getChangedNickName = e => {
    if (this.state.disabled === true) {
      this.setState({ disabled: false });
    }

    this.setState({
      nickName: e.nativeEvent.text,
    });
  };

  getChangedFullName = e => {
    if (this.state.disabled === true) {
      this.setState({ disabled: false });
    }

    this.setState({
      fullName: e.nativeEvent.text,
    });
  };

  getChangedBirthYear = e => {
    if (this.state.disabled === true) {
      this.setState({ disabled: false });
    }

    this.setState({
      birthYear: e.nativeEvent.text,
    });
  };

  // TODO: Display default-image after opening.
  requestPhotoAndCameraPermission = async () => {
    try {
      return {
        photo: await Permissions.request('photo'),
        camera: await Permissions.request('camera'),
      };
    } catch (e) {
      console.log(e);
    }

    return { photo: 'undetermined', camera: 'undetermined' };
  };

  checkPhotoAndCameraPermission = async () => {
    try {
      return await Permissions.checkMultiple(['photo', 'camera']);
    } catch (e) {
      console.log(e);
    }

    return { photo: 'undetermined', camera: 'undetermined' };
  };

  openImageGallery = () => {
    ImagePicker.launchCamera(options, response => {
      if (!response.didCancel) {
        const source = { uri: response.uri, isStatic: true };

        this.setState({
          disabled: false,
          image: source.uri ? source.uri : null,
        });
      }
    });
  };

  resetForm = () => {
    this.setState({
      id: null,
      nickName: '',
      fullName: '',
      birthYear: null,
      image: null,
    });
  };

  handleTabClick = user => {
    const isEmptyTab = user.get('id') === null;

    this.setState({
      disabled: true,
      id: user.get('id'),
      nickName:
        user.get('name') === '+ Lisää'
          ? defaultUser.nickName
          : user.get('name'),
      image: user.get('image'),
      fullName: isEmptyTab ? defaultUser.fullName : '*********',
      birthYear: isEmptyTab ? defaultUser.birthYear : '*********',
    });
  };

  renderTabBar = () =>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.tabBar}
    >
      {this.renderTabs()}
    </ScrollView>;

  renderTabs = () =>
    this.props.users
      .push(
        Map({
          name: '+ Lisää',
          image: null,
          id: null,
        }),
      )
      .map((user, key) => this.renderTab(user, key));

  renderTab = (user, key) =>
    <TouchableOpacity
      key={key}
      onPress={() => this.handleTabClick(user)}
      style={[
        styles.tab,
        { borderColor: user.get('id') === this.state.id ? '#1E90FF' : '#fff' },
      ]}
    >
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[
          styles.tabText,
          styles.font,
          {
            fontWeight: user.get('id') === this.state.id ? 'bold' : 'normal',
          },
        ]}
      >
        {user.get('name')}
      </Text>
    </TouchableOpacity>;

  renderNickNameField = () =>
    <View style={styles.formField}>
      <Text style={[styles.label, styles.font]}>Lempinimi</Text>
      <TextInput
        style={styles.input}
        ref="nickName"
        onChange={this.getChangedNickName}
        value={this.state.nickName}
      />
    </View>;

  renderFullNameField = () =>
    <View style={styles.formField}>
      <Text style={[styles.label, styles.font]}>Koko nimi</Text>
      <TextInput
        style={[
          styles.input,
          { color: this.state.id === null ? '#000' : '#D3D3D3' },
        ]}
        ref="fullName"
        editable={this.state.id === null}
        onChange={this.getChangedFullName}
        value={this.state.fullName}
      />
    </View>;

  renderBirthYearField = () =>
    <View style={styles.formField}>
      <Text style={[styles.label, styles.font]}>Syntymävuosi</Text>
      <TextInput
        style={[
          styles.input,
          { color: this.state.id === null ? '#000' : '#D3D3D3' },
        ]}
        ref="birthYear"
        editable={this.state.id === null}
        onChange={this.getChangedBirthYear}
        value={this.state.birthYear}
        keyboardType={'numeric'}
      />
    </View>;

  showRequestDialog = async () => {
    const permission = await this.requestPhotoAndCameraPermission();

    if (
      permission.camera === 'authorized' &&
      permission.photo === 'authorized'
    ) {
      this.openImageGallery();
    }
  };

  handleSelectImageClick = async () => {
    const permission = await this.checkPhotoAndCameraPermission();

    if (
      permission.camera !== 'authorized' ||
      permission.photo !== 'authorized'
    ) {
      return Alert.alert(
        'Saammeko käyttää laitteesi kameraa ja kuvakirjastoa?',
        'Tarvitsemme oikeudet kameraan ja kuviin, jotta kuvan valitseminen onnistuu.',
        [
          {
            text: 'Estä',
            onPress: () => console.log('permission denied'),
            style: 'cancel',
          },
          permission.camera === 'undetermined' ||
          permission.photo === 'undetermined' ||
          Platform.OS === 'android'
            ? { text: 'Salli', onPress: this.showRequestDialog }
            : { text: 'Avaa asetukset', onPress: Permissions.openSettings },
        ],
      );
    }

    this.openImageGallery();
  };

  renderImage = () =>
    <TouchableOpacity
      onPress={this.handleSelectImageClick}
      style={styles.image}
    >
      <Image
        source={getImage('nelio').normal}
        style={getSizeByWidth('nelio', 0.25)}
      >
        <Image
          style={styles.icon}
          source={
            this.state.image
              ? { uri: this.state.image }
              : getImage('default_image').normal
          }
        />
      </Image>
    </TouchableOpacity>;

  renderSaveButton = () =>
    <View style={styles.saveButton}>
      <Button
        onPress={this.saveChild}
        title={this.state.id === null ? 'Lisää lapsi' : 'Tallenna muutokset'}
        color={'#41A62A'}
        disabled={this.state.disabled}
      />
    </View>;

  renderRemoveUserButton = () =>
    this.state.id !== null
      ? <TouchableOpacity
          style={styles.removeButton}
          onPress={this.verifyRemoveUser}
        >
          <Text style={styles.removeButtonText}>Poista lapsi</Text>
        </TouchableOpacity>
      : null;

  renderTabBody = () =>
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      overScrollMode={'always'}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.tabBody}>
        {this.renderImage()}
        {this.renderNickNameField()}
        {this.renderFullNameField()}
        {this.renderBirthYearField()}
        <View style={styles.buttonColumn}>
          {this.renderSaveButton()}
          {this.renderRemoveUserButton()}
        </View>
      </View>
    </ScrollView>;

  renderSaveConfirmationWindow = () =>
    this.state.showSucceedingMessage
      ? <SaveConfirmationWindow closeWindow={this.closeSucceedingMessage} />
      : null;

  render() {
    if (this.state.loading) {
      return <LoadingSpinner />;
    }

    return (
      <View style={styles.container}>
        {this.renderTabBar()}
        {this.renderTabBody()}
        {this.renderSaveConfirmationWindow()}
      </View>
    );
  }
}
