import {connect} from 'react-redux';
import FeedbackView from './FeedbackView';

export default connect(
  state => ({
    answers: state.getIn(['user', 'currentUser', 'answers']),
    showTitle: state.getIn(['feedback', 'showTitle'])
  })
)(FeedbackView);
