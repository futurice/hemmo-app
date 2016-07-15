import {connect} from 'react-redux';
import Record from './Record';

export default connect(
  state => ({
    answers: state.getIn(['user', 'currentUser', 'answers'])
  })
)(Record);
