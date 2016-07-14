import {connect} from 'react-redux';
import RecordOrWrite from './RecordOrWrite';

export default connect(
  state => ({
    answers: state.getIn(['user', 'currentUser', 'answers'])
    // navigationState: state.get('navigationState').toJS()
  })
)(RecordOrWrite);
