import {connect} from 'react-redux';
import FeedbackView from './FeedbackView';

export default connect(
  state => ({
    answers: state.getIn(['user', 'currentUser', 'answers']),
    enableWriting: state.getIn(['feedback', 'enableWriting'])
  })
)(FeedbackView);
