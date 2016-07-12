import {connect} from 'react-redux';
import HomeView from './HomeView';

export default connect(
  state => ({
    users: state.getIn(['user', 'users']),
    currentUser: state.getIn(['user', 'currentUser']),
    shouldHide: state.getIn(['home', 'shouldHide'])
  })
)(HomeView);
