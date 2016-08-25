import {connect} from 'react-redux';
import AudioPlayerView from './AudioPlayerView';

export default connect(
  state => ({
    isActive: state.getIn(['session', 'isActive'])
  })
)(AudioPlayerView);
