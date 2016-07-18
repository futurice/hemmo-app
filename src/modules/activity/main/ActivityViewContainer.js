import {connect} from 'react-redux';
import MainActivityView from './MainActivityView';

export default connect(
  state => ({
    savedActivities: state.getIn(['user', 'currentUser', 'answers', 'activities']),
    activityIndex: state.getIn(['user', 'activityIndex'])
  })
)(MainActivityView);
