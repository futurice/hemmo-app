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

  toggleModal() {
    this.setState({modalVisible: !this.state.modalVisible});
  },

  reset() {
    if (this.props.shouldSave === true) {
      this.save();
    }
    this.props.resetRoute();
  },

  quit() {
    if (this.props.shouldSave === true) {
      this.save();
    }
    this.setState({modalVisible: false});
    this.props.quit();
  },

  save() {
    formRequestBody(
      this.props.phase,
      'skipped', 'Ohitettu',
      this.props.currentUser.get('activityIndex'),
      this.props.currentUser.get('answers'))
        .then(body => save(null, 'skipped', body));
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
                <Image source={getImage('kehys_palkki')} style={[getSize('kehys_palkki', 0.2), styles.row]}>
                  <TouchableHighlight onPress={this.reset}>
                    <Text style={styles.font}>Vaihda käyttäjää</Text>
                  </TouchableHighlight>
                </Image>
                <Image source={getImage('kehys_palkki')} style={[getSize('kehys_palkki', 0.2), styles.row]}>
                  <TouchableHighlight onPress={this.quit}>
                    <Text style={styles.font}>Lopeta</Text>
                  </TouchableHighlight>
                </Image>
               </View>
               <TouchableOpacity
                onPress={this.toggleModal}
                style={[styles.closeButton, getSize('nappula_rasti', 0.1)]}>
                 <Image
                   source={getImage('nappula_rasti')}
                   style={getSize('nappula_rasti', 0.1)}/>
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
        <TouchableOpacity onPress={this.toggleModal} style={styles.circle}>
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(184, 184, 184, 0.9)'
  },
  modal: {
    borderWidth: 4,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(180, 180, 180, 1)'
  },
  font: {
    fontSize: 25,
    fontFamily: 'Gill Sans'
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: 40,
    top: -10
  }
});

export default SettingsButton;
