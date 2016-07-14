import {connect} from 'react-redux';
import ThumbVote from './ThumbVote';

export default connect(
  state => ({
    answers: state.getIn(['user', 'currentUser', 'answers'])
    // navigationState: state.get('navigationState').toJS()
  })
)(ThumbVote);
