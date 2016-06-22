import * as SettingsState from './SettingsState';
import * as HomeState from '../../modules/home/HomeState'
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

var name;
var age;

const SettingsView = React.createClass({

  createKid() {
    console.log("Lapsen nimi ja ikä olivat " + name + " " + age);
    this.props.dispatch(HomeState.addKid(name, age));
  },

  getName(e) {
    name = e.nativeEvent.text;
  },

  getAge(e) {
    age = e.nativeEvent.text;
  },

  render() {

    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

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
                  ref = "name"
                  onChange = {this.getName}/>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>
                Ikä:
              </Text>
              <View>
                <TextInput style={styles.input}
                ref="age"
                onChange={this.getAge}
                />
              </View>
            </View>

            <View style={styles.imagefield}>
              <TouchableHighlight style={styles.touchable}>
                <Image style={styles.icon} source={require('../../../assets/default-icon.png')}/>

              </TouchableHighlight>

            </View>
          </View>

          <View style={styles.buttoncolumn}>

            <View style={styles.buttonfield}>
              <TouchableHighlight
                onPress={this.createKid}
                style={styles.touchable}>

                <View style={styles.savebutton}>
                  <Text style={styles.label, styles.highlight}>
                    Tallenna
                  </Text>
                </View>
              </TouchableHighlight>
            </View>

            <View style={styles.buttonfield}>
              <TouchableHighlight
                style={styles.touchable}>

                <View style={styles.cancelbutton}>
                  <Text style={styles.label, styles.highlight}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  form: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
  },
  fieldcolumn: {
    flex: 1,
    flexDirection: 'column',
  },
  buttoncolumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  field: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonfield: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagefield: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    textAlign: 'center',
    fontSize: 20,
  },
  touchable: {
    borderRadius: 60,
  },
  highlight: {
    color: '#F5FCFF'
  },
  savebutton: {
    backgroundColor: 'green',
    borderRadius: 60,
    height: 120,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelbutton: {
    backgroundColor: 'grey',
    borderRadius: 20,
    height: 30,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 100,
    width: 100,
  }
});

export default SettingsView;
