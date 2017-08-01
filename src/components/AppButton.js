import React from 'react';
import * as Animatable from 'react-native-animatable';

// resolveAssetSource is part of react-native
// eslint-disable-next-line
import resolveAssetSource from 'resolveAssetSource';
import { TouchableOpacity, Image, View } from 'react-native';

Animatable.initializeRegistryWithDefinitions({
  pressAnimation: {
    0: {
      scaleX: 1,
      scaleY: 1,
    },
    0.25: {
      scaleX: 1.15,
      scaleY: 0.85,
    },
    0.5: {
      scaleX: 1,
      scaleY: 1,
    },
    0.75: {
      scaleX: 0.95,
      scaleY: 1.05,
    },
    1: {
      scaleX: 1,
      scaleY: 1,
    },
  },
});

const assets = require('../data/graphics');

export default class AppButton extends React.Component {
  state = {
    width: 0,
    height: 0,
  };

  componentWillMount() {
    if (!assets[this.props.background]) {
      throw `FATAL: Asset not found for ${this.props.background}!`;
    }

    // https://stackoverflow.com/questions/42170127/auto-scale-image-height-with-react-native
    const { width, height } = resolveAssetSource(
      assets[this.props.background].normal,
    );

    if (this.props.width && !this.props.height) {
      this.setState({
        width: this.props.width,
        height: height * (this.props.width / width),
      });
    } else if (!this.props.width && this.props.height) {
      this.setState({
        width: width * (this.props.height / height),
        height: this.props.height,
      });
    } else {
      this.setState({ width, height });
    }
  }

  renderImage() {
    const imgSource = this.props.shadow
      ? assets[this.props.background].shadow
      : assets[this.props.background].normal;

    return (
      <Image
        style={{
          opacity: this.props.disabled ? 0.5 : 1,
          width: this.state.width,
          height: this.state.height,
        }}
        resizeMode="contain"
        source={imgSource}
      >
        <View
          style={{
            // default styles for content container
            width: '100%',
            height: '100%',
            alignItems: 'center',
            flexDirection: 'row',

            // custom styles for content container
            ...this.props.contentContainerStyle,
          }}
        >
          {this.props.children}
        </View>
      </Image>
    );
  }

  render() {
    return this.props.disabled
      ? this.renderImage()
      : <Animatable.View
          useNativeDriver
          easing="ease-out-cubic"
          ref={animatable => {
            this.animatable = animatable;
          }}
        >
          <TouchableOpacity
            onPressIn={() => this.animatable.pressAnimation(700)}
            onPress={() => this.props.onPress()}
          >
            {this.renderImage()}
          </TouchableOpacity>
        </Animatable.View>;
  }
}
