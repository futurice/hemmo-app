import {connect} from 'react-redux';
import EmotionView from './EmotionView';

export default connect(
  state => ({
    activityIndex: state.getIn(['user', 'activityIndex'])
  })
)(EmotionView);
