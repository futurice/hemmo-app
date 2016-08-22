import {connect} from 'react-redux';
import AppView from './AppView';

export default connect(
  state => ({
    isReady: state.getIn(['session', 'isReady']),
    currentUser: state.getIn(['user', 'currentUser']),
    currentPage: state.getIn(['navigationState', 'index']),
    pages: state.getIn(['navigationState', 'children'])
  })
)(AppView);
