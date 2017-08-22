import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Image,
  TextInput,
  Alert,
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { addFreeWord } from '../state/UserState';
import { showSaveModal } from '../state/SessionState';
import { getImage, getSizeByWidth } from '../services/graphics';
import DoneButton from '../components/DoneButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  textBoxContainer: {
    paddingVertical: 32,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    alignSelf: 'center',
    fontSize: 22,
  },
});

const mapDispatchToProps = dispatch => ({
  saveFreeWord: freeWord => dispatch(addFreeWord(freeWord)),
  showSaveModal: () => dispatch(showSaveModal()),
});

@connect(null, mapDispatchToProps)
export default class WriteViewContainer extends Component {
  static navigationOptions = {
    title: 'Kirjoita',
    headerRight: <View />, // Needed for a centered title,
    headerTitleStyle: styles.headerTitle,
  };

  static propTypes = {
    saveFreeWord: PropTypes.func.isRequired,
    showSaveModal: PropTypes.func.isRequired,
  };

  state = {
    text: '',
  };

  error = () => {
    Alert.alert(
      'Ohops!',
      'Jokin meni pieleen! Tarkista nettiyhteys tai yritä myöhemmin uudelleen!',
      [{ text: 'Ok' }],
    );
  };

  renderTextForm = () =>
    <Image
      style={{
        height: 250,
        width: getSizeByWidth('textbox', 0.9).width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}
      resizeMode="stretch"
      source={getImage('textbox').normal}
    >
      <TextInput
        multiline
        autoFocus={!this.state.text}
        numberOfLines={30}
        maxLength={500}
        onChangeText={text => this.setState({ text })}
        underlineColorAndroid="transparent"
        style={{
          flex: 1,
          textAlignVertical: 'top',
          margin: 16,
          fontFamily: 'Roboto-Regular',
        }}
      />
    </Image>;

  storeText = () => {
    this.props.saveFreeWord({ type: 'text', content: this.state.text });
    this.props.showSaveModal();
  };

  renderDoneButton = () =>
    <DoneButton
      onPress={this.storeText}
      disabled={this.state.text.length === 0}
    />;

  render() {
    return (
      <Image source={getImage('forest').normal} style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          overScrollMode={'always'}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.textBoxContainer}>
            {this.renderTextForm()}
          </View>
        </ScrollView>
        {Platform.OS === 'ios'
          ? <KeyboardAvoidingView
              behavior={'padding'}
              keyboardVerticalOffset={-64}
            >
              {this.renderDoneButton()}
            </KeyboardAvoidingView>
          : this.renderDoneButton()}
      </Image>
    );
  }
}
