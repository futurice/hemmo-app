import {connect} from 'react-redux';
import MoodView from './MoodView';

export default connect(
  state => ({
    activityIndex: state.getIn(['user', 'currentUser', 'activityIndex'])
  })
)(MoodView);
