import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImage } from '../../services/graphics';
import SpeechBubble from '../../components/SpeechBubble';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    height: 40,
    width: 40,
  },
});

export default class Hemmo extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  state = {
    showBubble: true,
  };

  toggleBubble = () => {
    this.setState({ showBubble: !this.state.showBubble });
  };

  renderBubble = () => this.state.showBubble ? (
    <SpeechBubble
      bubbleType={'puhekupla_oikea'}
      hideBubble={this.toggleBubble}
      navigatorState={this.props.navigation.state}
    />
  ) : null;

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        {this.renderBubble()}
        <TouchableOpacity onPress={this.toggleBubble}>
          <Image
            source={getImage('hemmo_pieni')}
            style={styles.image}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}
