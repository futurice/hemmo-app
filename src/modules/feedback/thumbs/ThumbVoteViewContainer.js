import {connect} from 'react-redux';
import ThumbVote from './ThumbVote';

export default connect(
  state => ({
    savedActivities: state.getIn(['user', 'currentUser', 'answers', 'activities']),
    activityIndex: state.getIn(['user', 'activityIndex'])
  })
)(ThumbVote);
