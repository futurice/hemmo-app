import React from 'react';
import PropTypes from 'prop-types';

import AppButton from './AppButton';
import { getSizeByHeight } from '../services/graphics';

export default class DoneButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <AppButton
        background={'done_button'}
        onPress={this.props.onPress}
        width={getSizeByHeight('done_button', 1).width}
        shadow={false}
        disabled={this.props.disabled}
      />
    );
  }
}
