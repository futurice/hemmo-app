import * as SettingsState from './SettingsState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

const SettingsView = React.createClass({
  propTypes: {
    counter: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired
  },


  settings() {
    console.log("Do nothing");
  },


  render() {
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

    return (
      <View style={styles.container}>
        <View style={styles.form}>

          <View style={styles.field}>
            <Text style={styles.label}>
              Name:
            </Text>
            <View>
              <TextInput style={styles.input}/>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>
              Age:
            </Text>
            <View>
              <TextInput style={styles.input}/>
            </View>
          </View>

          <View style={styles.field}>
            <TouchableHighlight
              onPress={this.settings}
              style={styles.touchable}>

              <View style={styles.button}>
                <Text style={styles.label, styles.highlight}>
                  Tallenna
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  form: {
    position: 'absolute',
    top: 30,
    left: 10,
    right: 10,
    bottom: 10,
    margin: 20,
  },
  field: {
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
    fontSize: 25,
  },
  input: {
    textAlign: 'center',
    fontSize: 20,
  },
  touchable: {
    borderRadius: 40
  },
  highlight: {
    color: '#F5FCFF'
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 40,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SettingsView;
