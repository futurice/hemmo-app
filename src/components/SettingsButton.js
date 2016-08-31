import React, {PropTypes} from 'react';
import {Map} from 'immutable';
import {getSize, getImage} from '../services/graphics';
import {save, formRequestBody} from '../services/save';

import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native';

const SettingsButton = React.createClass({

  propTypes: {
    resetRoute: PropTypes.func.isRequired,
    quit: PropTypes.func.isRequired,
    shouldSave: PropTypes.bool,
    phase: PropTypes.string,
    currentUser: PropTypes.instanceOf(Map)
  },

  getInitialState() {
    return {
      modalVisible: false
    };
  },

  open() {
    this.setState({modalVisible: true});
  },

  hideModal() {
    this.setState({modalVisible: false});
  },

  saveAndReset() {
    if (this.props.shouldSave === true) {
      this.save();
    }
    this.props.resetRoute();
  },

  save() {
    formRequestBody(
      this.props.phase,
      'skipped', 'Ohitettu',
      this.props.currentUser.get('activityIndex'),
      this.props.currentUser.get('answers'))
        .then(body => save(null, 'skipped', body));
  },

  quit() {
    if (this.props.shouldSave === true) {
      this.save();
    }
    this.setState({modalVisible: false});
    this.props.quit();
  },

  render() {

    if (this.state.modalVisible === true) {
      var modal = (<Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('jee')}>
          <View style={styles.modalContainer}>
            <View style={styles.upperModal}>
              <View style={styles.modal}>
                <View style={styles.row}>
                  <TouchableHighlight onPress={this.saveAndReset}>
                    <Text style={styles.font}>Vaihda käyttäjää</Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.row}>
                  <TouchableHighlight onPress={this.quit}>
                    <Text style={styles.font}>Lopeta</Text>
                  </TouchableHighlight>
                </View>
               </View>
               <TouchableOpacity
                onPress={this.hideModal}
                style={[styles.closeButton, getSize('nappula_rasti', 0.1)]}>
                 <Image
                   source={getImage('nappula_rasti')}
                   style={[styles.closeButton, getSize('nappula_rasti', 0.1)]}/>
               </TouchableOpacity>
             </View>
           </View>
        </Modal>);
    }
    else {
      modal = null;
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.open} style={styles.circle}>
          <Image style={styles.image} source={{uri: this.props.currentUser.get('image')}}/>
        </TouchableOpacity>
        {modal}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 5,
    top: 5
  },
  circle: {
    backgroundColor: 'gray',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    height: 50,
    width: 50
  },
  image: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderRadius: 20
  },
  upperModal: {
    margin: 80,
    flexDirection: 'row',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(184, 184, 184, 0.8)'
  },
  modal: {
    flex: 1,
    marginHorizontal: 20,
    height: 130,
    borderWidth: 4,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  font: {
    fontSize: 25,
    fontFamily: 'Gill Sans'
  },
  row: {
    flex: 1,
    justifyContent: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0
  }
});

export default SettingsButton;
