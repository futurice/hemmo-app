import React, {PropTypes} from 'react';

import {
  Text,
  View
} from 'react-native';

const AudioRecordView = React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired
  },
  render() {

    return (
      <View>
        <Text>
          Täällä ollaan!
        </Text>
      </View>
    );
  }
});

export default AudioRecordView;